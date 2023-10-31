<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        /* Users */
        UserFactory::baseUsers();
        UserFactory::new()->many(6, 10)->create([
            'password' => UserFactory::HASHED_PASSWORD,
        ]);

        /* Apiaries */
        ApiaryFactory::baseApiary();
        ApiaryFactory::createMany(30);

        $manager->flush();
    }
}
