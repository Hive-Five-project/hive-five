<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Beehive\FindBeehiveTest\fixtures\FindBeehiveStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class FindBeehiveTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        FindBeehiveStory::load();

        $this->executeGraphQL([
            'uid' => FindBeehiveStory::ULID_BEEHIVE_USER,
        ], $this->getInputContent('testFindBeehive'));

        $this->assertGraphQLAccessDenied();
    }

    public function testFoundAsAdmin(): void
    {
        FindBeehiveStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => FindBeehiveStory::ULID_BEEHIVE_ADMIN,
        ], $this->getInputContent('testFindBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testFoundAsUser(): void
    {
        FindBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindBeehiveStory::ULID_BEEHIVE_USER,
        ], $this->getInputContent('testFindBeehive'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testNotFound(): void
    {
        FindBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindBeehive'));

        $this->assertGraphQLNotFoundResponse('Beehive with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testForbiddenNotOwner(): void
    {
        FindBeehiveStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindBeehiveStory::ULID_BEEHIVE_ADMIN,
        ], $this->getInputContent('testFindBeehive'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access beehive with 01HF7XBCB9Q9T8DZN9F48SFPE2');
    }
}
