<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Buying\ListMyBuyingsTest\fixtures\ListBuyingsStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ListMyBuyingsTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        ListBuyingsStory::load();

        $this->executeGraphQL([
            'uid' => ListBuyingsStory::ULID_BUYING_ADMIN,
        ], $this->getInputContent('testListBuyings'));

        $this->assertGraphQLAccessDenied();
    }

    public function testAuthenticatedAsUser(): void
    {
        ListBuyingsStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListBuyingsStory::ULID_BUYING_USER,
        ], $this->getInputContent('testListBuyings'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testAuthenticatedAsAdmin(): void
    {
        ListBuyingsStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => ListBuyingsStory::ULID_BUYING_ADMIN,
        ], $this->getInputContent('testListBuyings'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }
}
