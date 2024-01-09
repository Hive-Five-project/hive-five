<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Riser\UpdateRiserTest\fixtures\UpdateRiserStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UpdateRiserTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid, array $payload): void
    {
        UpdateRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateRiser'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'update riser' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => 'new name for riser',
                'beehive' => UpdateRiserStory::NEW_ULID_BEEHIVE,
                'frames' => [
                    UpdateRiserStory::ULID_FRAME_1,
                    UpdateRiserStory::ULID_FRAME_2,
                ],
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid, array $payload): void
    {
        UpdateRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateRiser'));
        $this->assertGraphQLForbiddenResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            UpdateRiserStory::ULID_RISER_OTHER,
            [
                'name' => 'new name for riser',
                'beehive' => UpdateRiserStory::NEW_ULID_BEEHIVE,
            ],
        ];

        yield 'not owner beehive' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => 'new name for riser',
                'beehive' => UpdateRiserStory::ULID_BEEHIVE_OTHER,
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidFrameAlreadyInUse
     */
    public function testInvalidFrameAlreadyInUse(string $uid, array $payload): void
    {
        UpdateRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateRiser'));
        $this->assertGraphQLForbiddenResponse('Frames is already used by another riser');
    }

    public function provide testInvalidFrameAlreadyInUse(): iterable
    {
        yield 'update riser' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => 'new name for riser',
                'beehive' => UpdateRiserStory::ULID_BEEHIVE,
                'frames' => [
                    UpdateRiserStory::ULID_FRAME_1_OTHER,
                ],
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(string $uid, array $payload): void
    {
        UpdateRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateRiser'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => null,
                'beehive' => null,
                'frames' => null,
            ],
        ];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => $wayTooLongValue,
            ],
        ];

        yield 'Wrong Frame Type' => [
            UpdateRiserStory::ULID_RISER,
            [
                'name' => 'new name for riser',
                'beehive' => UpdateRiserStory::ULID_BEEHIVE,
                'frames' => [
                    UpdateRiserStory::ULID_FRAME_BEEHIVE,
                ],
            ],
        ];
    }
}
