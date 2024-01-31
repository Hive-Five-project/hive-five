<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\BuyingFactory;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        /* Users */
        UserFactory::baseUsers();
        UserFactory::new()->many(2, 5)->create([
            'password' => UserFactory::HASHED_PASSWORD,
        ]);

        /* Apiaries */
        ApiaryFactory::createMany(15);

        /* Frames */
        FrameFactory::createMany(70);

        /* Beehives */
        BeehiveFactory::createMany(20);

        /* Risers */
        RiserFactory::createMany(30);

        /* Buyings */
        BuyingFactory::createMany(10);

        $manager->flush();
    }
}
