<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive;

use App\Domain\Beehive\BeeType;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Beehive\CreateBeehiveTest\fixtures\CreateBeehiveStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateBeehiveTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(array $payload): void
    {
        CreateBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('payload'), $this->getInputContent('testCreateBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'new apiary' => [[
            'name' => 'new beehive',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => CreateBeehiveStory::ULID_APIARY,
        ]];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(array $payload): void
    {
        $this->loginAsUser();

        CreateBeehiveStory::load();

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateBeehive'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [[
            'name' => null,
            'bee' => null,
            'age' => null,
            'apiary' => null,
        ]];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [[
            'name' => $wayTooLongValue,
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => CreateBeehiveStory::ULID_APIARY,
        ]];

        yield 'wrong age type' => [[
            'name' => 'new name',
            'bee' => BeeType::Buckfast,
            'age' => '2',
            'apiary' => CreateBeehiveStory::ULID_APIARY,
        ]];
    }
}
