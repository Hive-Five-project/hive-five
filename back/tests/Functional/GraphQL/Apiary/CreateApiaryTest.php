<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Fixtures\Factory\UserFactory;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(array $payload): void
    {
        $this->loginAsUser();
        $this->executeGraphQL(compact('payload'), $this->getInputContent('testCreateApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'new apiary' => [[
            'name' => 'new apiary',
            'address' => 'some new address',
        ]];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(array $payload): void
    {
        $this->loginAsUser();

        ApiaryFactory::new()->createOne([
            'name' => 'name-existing',
            'address' => 'address-existing'
        ]);

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateApiary'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [[
            'name' => null,
            'address' => null,
        ]];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [[
            'name' => $wayTooLongValue,
            'address' => $wayTooLongValue,
        ]];
    }
}
