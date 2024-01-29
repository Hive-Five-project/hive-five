<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Frame\UpdateFrameTest\fixtures\UpdateFrameStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UpdateFrameTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid, array $payload): void
    {
        UpdateFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateFrame'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'update Frame' => [
            UpdateFrameStory::ULID_FRAME,
            [
                'label' => 'new label',
                'type' => FrameType::Beehive,
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid, array $payload): void
    {
        UpdateFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateFrame'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access Frame 01HKM79KK7CSEV3XE2YD6PRTGZ');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            UpdateFrameStory::ULID_FRAME_ADMIN,
            [
                'label' => 'new label',
                'type' => FrameType::Beehive,
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(string $uid, array $payload): void
    {
        UpdateFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateFrame'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [
            UpdateFrameStory::ULID_FRAME,
            [
                'label' => null,
                'type' => null,
            ],
        ];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [
            UpdateFrameStory::ULID_FRAME,
            [
                'label' => $wayTooLongValue,
                'type' => FrameType::Beehive,
            ],
        ];
    }
}
