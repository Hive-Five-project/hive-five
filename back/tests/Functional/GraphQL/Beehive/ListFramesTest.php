<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Beehive\ListFramesTest\fixtures\ListFramesStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class ListFramesTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        ListFramesStory::load();

        $this->executeGraphQL([
            'uid' => ListFramesStory::ULID_BEEHIVE_USER,
        ], $this->getInputContent('testListFrames'));

        $this->assertGraphQLAccessDenied();
    }

    public function testAuthenticatedAsUser(): void
    {
        ListFramesStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListFramesStory::ULID_BEEHIVE_USER,
        ], $this->getInputContent('testListFrames'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testAuthenticatedAsAdmin(): void
    {
        ListFramesStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => ListFramesStory::ULID_BEEHIVE_ADMIN,
        ], $this->getInputContent('testListFrames'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testUnauthorized(): void
    {
        ListFramesStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => ListFramesStory::ULID_BEEHIVE_ADMIN,
        ], $this->getInputContent('testListFrames'));

        $this->assertGraphQLForbiddenResponse(
            'User user@example.com cannot access beehive with 01HF7XBCB9Q9T8DZN9F48SFPE2'
        );
    }
}
