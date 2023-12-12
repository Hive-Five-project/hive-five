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

        $this->loginAsAdmin();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'update Beehive' => [
            UpdateBeehiveStory::ULID_BEEHIVE,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 3,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY,
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsAdmin();

        // As user Admin, I can't update a Beehive that is not mine
        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertGraphQLForbiddenResponse('User admin@example.com cannot update beehive in this apiary 01HF9FR25AJ6W71ZC627CR0PH8');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            UpdateBeehiveStory::ULID_BEEHIVE_USER,
            [
                'name' => 'new name',
                'bee' => BeeType::Black,
                'age' => 3,
                'apiary' => UpdateBeehiveStory::ULID_APIARY_USER,
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(string $uid, array $payload): void
    {
        UpdateBeehiveStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateBeehive'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [
            UpdateBeehiveStory::ULID_BEEHIVE,
            [
                'name' => null,
                'bee' => null,
                'age' => null,
                'apiary' => null,
            ],
        ];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [
            UpdateBeehiveStory::ULID_APIARY,
            [
                'name' => $wayTooLongValue,
                'bee' => BeeType::Black,
                'age' => 1,
                'apiary' => UpdateBeehiveStory::NEW_ULID_APIARY,
            ],
        ];
    }
}
