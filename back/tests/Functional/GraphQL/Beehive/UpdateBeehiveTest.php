<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive;

use App\Domain\Beehive\BeeType;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Beehive\UpdateBeehiveTest\fixtures\UpdateBeehiveStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UpdateBeehiveTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'update Beehive' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 3,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY_USER,
                'frames' => [
                    UpdateBeehiveStory::ULID_FRAME_1_USER,
                    UpdateBeehiveStory::ULID_FRAME_2_USER,
                ],
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsUser();

        // As user Admin, I can't update a Beehive that is not mine
        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot update beehive in this apiary 01H5KQW6EBYNGSWRE09ANVREXX');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 3,
                'apiary' => UpdateBeehiveStory::ULID_APIARY_ADMIN,
                'frames' => [
                    UpdateBeehiveStory::ULID_FRAME_1_ADMIN,
                ],
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidFrameAlreadyInUse
     */
    public function testInvalidFrameAlreadyInUse(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));
        $this->assertGraphQLForbiddenResponse('Frames is already used by another beehive');
    }

    public function provide testInvalidFrameAlreadyInUse(): iterable
    {
        yield 'update Beehive' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 3,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY_USER,
                'frames' => [
                    UpdateBeehiveStory::ULID_FRAME_1_ADMIN,
                ],
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => null,
                'bee' => null,
                'age' => null,
                'apiary' => null,
                'frames' => null,
            ],
        ];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => $wayTooLongValue,
                'bee' => BeeType::Black,
                'age' => 1,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY_USER,
                'frames' => [],
            ],
        ];

        yield 'Wrong Frame Type' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 1,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY_USER,
                'frames' => [UpdateBeehiveStory::ULID_FRAME_RISER],
            ],
        ];
    }
}
