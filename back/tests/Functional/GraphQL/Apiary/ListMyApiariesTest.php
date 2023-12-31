<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Apiary\ListMyApiariesTest\fixtures\ListApiaryStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ListMyApiariesTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        $this->executeGraphQL([], $this->getInputContent('testListMyApiaries'))->getContent();
        $this->getClientResponse()->getContent();

        $this->assertGraphQLAccessDenied();
    }

    public function testAuthenticatedAsUser(): void
    {
        ListApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([], $this->getInputContent('testListMyApiaries'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testAuthenticatedAsAdmin(): void
    {
        ListApiaryStory::load();

        $this->loginAsAdmin();
        $this->executeGraphQL([], $this->getInputContent('testListMyApiaries'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }
}
