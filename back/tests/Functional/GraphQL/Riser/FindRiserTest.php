<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Riser\FindRiserTest\fixtures\FindRiserStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class FindRiserTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        FindRiserStory::load();

        $this->executeGraphQL([
            'uid' => FindRiserStory::ULID_RISER,
        ], $this->getInputContent('testFindRiser'));

        $this->assertGraphQLAccessDenied();
    }

    public function testFound(): void
    {
        FindRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindRiserStory::ULID_RISER,
        ], $this->getInputContent('testFindRiser'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function testNotFound(): void
    {
        FindRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => '01H26252WYSK0MJN07YX2M9BWA',
        ], $this->getInputContent('testFindRiser'));

        $this->assertGraphQLNotFoundResponse('Riser with UID "01H26252WYSK0MJN07YX2M9BWA" not found');
    }

    public function testForbiddenNotOwner(): void
    {
        FindRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL([
            'uid' => FindRiserStory::ULID_RISER_OTHER,
        ], $this->getInputContent('testFindRiser'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot access riser with 01HFHFSQ7Z5NTV5F23HJZCGR9D');
    }
}
