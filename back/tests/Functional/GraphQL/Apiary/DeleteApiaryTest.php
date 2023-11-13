<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Apiary\DeleteApiaryTest\fixtures\DeleteApiaryStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class DeleteApiaryTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid): void
    {
        DeleteApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteApiary'));

        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'delete Apiary' => [
            DeleteApiaryStory::ULID_APIARY,
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid): void
    {
        DeleteApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteApiary'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot delete apiary 01HE39KXBWVS6N93ZB9WEXJ3RF');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            DeleteApiaryStory::ULID_APIARY_ADMIN,
        ];
    }

    /**
     * @dataProvider provide testInvalidWithBees
     */
    public function testInvalidWithBees(string $uid): void
    {
        DeleteApiaryStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteApiary'));

        $this->assertGraphQLForbiddenResponse('Apiary 01HF30NQ48NZDA9MYG38MBK8WV has hives, cannot delete');
    }

    public function provide testInvalidWithBees(): iterable
    {
        yield 'with bees' => [
            DeleteApiaryStory::ULID_APIARY_WITH_BEES,
        ];
    }
}
