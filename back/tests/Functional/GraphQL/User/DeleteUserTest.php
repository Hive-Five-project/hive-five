<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\User;

use App\Infrastructure\Fixtures\Factory\UserFactory;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class DeleteUserTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    public function testLoginForInactiveUser(): void
    {
        $this->loginAs(UserFactory::EMAIL_INACTIVE_USER, null, true);
    }

    public function testApiForInactiveUser(): void
    {
        // Login as admin then turn itself deleted
        $this->loginAsAdmin();
        $uid = UserFactory::ULID_ADMIN;

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteUser'));
        $this->assertValidGraphQLResponse();

        // Assert api access denied
        $this->executeGraphQL([], $this->getInputContent('testQueryUserDeleted'))->getContent();
        $this->assertJsonResponseMatchesExpectations();
    }
}
