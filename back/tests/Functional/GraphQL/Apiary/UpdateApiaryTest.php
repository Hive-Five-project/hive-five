<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UpdateApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid, array $payload): void
    {
        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'update Apiary' => [
            ApiaryFactory::ULID_APIARY,
            [
                'name' => 'new name',
                'address' => 'new address',
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid, array $payload): void
    {
        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateApiary'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access apiary with 01HE39KXBWVS6N93ZB9WEXJ3RF');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            ApiaryFactory::ULID_APIARY_ADMIN,
            [
                'name' => 'new name',
                'address' => 'new address',
            ],
        ];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(string $uid, array $payload): void
    {
        $this->loginAsUser();

        $this->executeGraphQL(compact('uid', 'payload'), $this->getInputContent('testUpdateApiary'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [
            ApiaryFactory::ULID_APIARY,
            [
                'name' => null,
                'address' => null,
            ],
        ];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [
            ApiaryFactory::ULID_APIARY,
            [
                'name' => $wayTooLongValue,
                'address' => $wayTooLongValue,
            ],
        ];
    }
}
