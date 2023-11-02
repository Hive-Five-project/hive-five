<?php

declare(strict_types=1);

namespace App\Infrastructure\Test\Fixtures\Story;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use PHPUnit\Framework\MockObject\Api;
use Zenstruck\Foundry\Story;

/**
 * Loads the global state of the application for tests.
 * For instances, it creates the base users.
 */
class GlobalTestsStory extends Story
{
    public function build(): void
    {
        UserFactory::baseUsers(hashedPassword: false);
        ApiaryFactory::baseApiary();
    }
}
