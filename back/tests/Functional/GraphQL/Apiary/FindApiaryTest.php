<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class FindApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        $this->executeGraphQL([
            'uid' => ApiaryFactory::ULID_APIARY,
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLAccessDenied();
    }

    public function testFoundAsAdmin(): void
    {
        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => ApiaryFactory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testFindApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testFoundAsUser(): void
    {
        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ApiaryFactory::ULID_APIARY,
        ], $this->getInputContent('testFindApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testNotFoundAsAdmin(): void
    {
        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLNotFoundResponse('Apiary with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testNotFoundAsUser(): void
    {
        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLNotFoundResponse('Apiary with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testForbiddenNotOwner(): void
    {
        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ApiaryFactory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLForbiddenResponse("User user@example.com cannot access apiary with 01HE39KXBWVS6N93ZB9WEXJ3RF");
    }
}
