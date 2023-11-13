<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Apiary\FindApiaryTest\fixtures\FindApiaryStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class FindApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        FindApiaryStory::load();

        $this->executeGraphQL([
            'uid' => FindApiaryStory::ULID_APIARY,
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLAccessDenied();
    }

    public function testFoundAsAdmin(): void
    {
        FindApiaryStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => FindApiaryStory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testFindApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testFoundAsUser(): void
    {
        FindApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindApiaryStory::ULID_APIARY,
        ], $this->getInputContent('testFindApiary'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testNotFoundAsAdmin(): void
    {
        FindApiaryStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLNotFoundResponse('Apiary with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testNotFoundAsUser(): void
    {
        FindApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLNotFoundResponse('Apiary with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testForbiddenNotOwner(): void
    {
        FindApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindApiaryStory::ULID_APIARY_ADMIN,
        ], $this->getInputContent('testFindApiary'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access apiary 01HE39KXBWVS6N93ZB9WEXJ3RF');
    }
}
