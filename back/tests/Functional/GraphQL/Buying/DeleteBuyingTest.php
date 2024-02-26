<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Buying\DeleteBuyingTest\fixtures\DeleteBuyingStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class DeleteBuyingTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testUnauthenticated(): void
    {
        DeleteBuyingStory::load();

        $this->executeGraphQL([
            'uid' => DeleteBuyingStory::ULID_BUYING,
        ], $this->getInputContent('testDeleteBuying'));

        $this->assertGraphQLAccessDenied();
    }

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid): void
    {
        DeleteBuyingStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteBuying'));

        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'delete Buying' => [
            DeleteBuyingStory::ULID_BUYING,
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid): void
    {
        DeleteBuyingStory::load();

        $this->loginAsAdmin();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteBuying'));
        $this->assertGraphQLForbiddenResponse('User admin@example.com cannot delete buying 01H5KQW6EBYNGSWRE09ANVZAER');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            DeleteBuyingStory::ULID_BUYING,
        ];
    }
}
