<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Beehive\ListBeehivesFromApiaryTest\fixtures\ListBeehivesStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ListBeehivesFromApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        ListBeehivesStory::load();

        $this->executeGraphQL([
            'uid' => ListBeehivesStory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testListBeehivesFromApiary'));

        $this->assertGraphQLAccessDenied();
    }

    public function testAuthenticatedAsUser(): void
    {
        ListBeehivesStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListBeehivesStory::ULID_APIARY_USER,
        ], $this->getInputContent('testListBeehivesFromApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testAuthenticatedAsAdmin(): void
    {
        ListBeehivesStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => ListBeehivesStory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testListBeehivesFromApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testUnauthorized(): void
    {
        ListBeehivesStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => ListBeehivesStory::ULID_APIARY_USER,
        ], $this->getInputContent('testListBeehivesFromApiary'));

        $this->assertGraphQLForbiddenResponse('User admin@example.com cannot access this beehive with 01H5KQW6EBYNGSWRE09ANVREXX');
    }
}
