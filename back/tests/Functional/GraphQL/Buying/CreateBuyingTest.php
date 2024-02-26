<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Buying\CreateBuyingTest\fixtures\CreateBuyingStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateBuyingTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(array $payload): void
    {
        CreateBuyingStory::load();
        $this->loginAsUser();
        $this->executeGraphQL(compact('payload'), $this->getInputContent('testCreateBuying'));
        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'new buying' => [[
            'label' => 'new buying',
            'price' => 199.99,
            'apiary' => CreateBuyingStory::ULID_APIARY,
            'date' => '2024-04-30T15:11:40+00:00',
        ]];

        yield 'empty apiary' => [[
            'label' => 'new buying',
            'price' => 199.99,
            'apiary' => null,
        ]];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(array $payload): void
    {
        $this->loginAsUser();
        CreateBuyingStory::load();

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateBuying'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [[
            'label' => $wayTooLongValue,
            'price' => 1000000,
            'apiary' => CreateBuyingStory::ULID_APIARY,
        ]];

        yield 'empty fields' => [[
            'label' => null,
            'price' => null,
            'apiary' => CreateBuyingStory::ULID_APIARY,
        ]];

        yield 'wrong price type' => [[
            'label' => 'label',
            'price' => 'price',
            'apiary' => CreateBuyingStory::ULID_APIARY,
        ]];
    }
}
