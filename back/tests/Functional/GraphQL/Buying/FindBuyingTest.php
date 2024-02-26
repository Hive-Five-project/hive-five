<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Buying\FindBuyingTest\fixtures\FindBuyingStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class FindBuyingTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        FindBuyingStory::load();

        $this->executeGraphQL([
            'uid' => FindBuyingStory::ULID_APIARY_USER,
        ], $this->getInputContent('testFindBuying'));

        $this->assertGraphQLAccessDenied();
    }

    public function testFoundAsAdmin(): void
    {
        FindBuyingStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => FindBuyingStory::ULID_BUYING_ADMIN,
        ], $this->getInputContent('testFindBuying'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testFoundAsUser(): void
    {
        FindBuyingStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindBuyingStory::ULID_BUYING_USER,
        ], $this->getInputContent('testFindBuying'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testNotFound(): void
    {
        FindBuyingStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindBuying'));

        $this->assertGraphQLNotFoundResponse('Buying with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testForbiddenNotOwner(): void
    {
        FindBuyingStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindBuyingStory::ULID_BUYING_ADMIN,
        ], $this->getInputContent('testFindBuying'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access buying 018bcfd5-b169-ba74-86fe-a9791197d9c2');
    }
}
