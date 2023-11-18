<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Riser\ListRisersFromBeehiveTest\fixtures\ListRisersStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ListRisersFromBeehiveTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        ListRisersStory::load();

        $this->executeGraphQL([
            'uid' => ListRisersStory::ULID_BEEHIVE,
        ], $this->getInputContent('testListRisersFromBeehive'));

        $this->assertGraphQLAccessDenied();
    }

    public function testAuthenticated(): void
    {
        ListRisersStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListRisersStory::ULID_BEEHIVE,
        ], $this->getInputContent('testListRisersFromBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testUnauthorized(): void
    {
        ListRisersStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListRisersStory::ULID_BEEHIVE_OTHER,
        ], $this->getInputContent('testListRisersFromBeehive'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access this riser with this beehive01HFHKHYJ0DAYMP4XSRXA7VZZE');
    }
}
