<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying\CreateBuyingTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class CreateBuyingStory extends Story
{
    public const ULID_APIARY = '01HTWE9J2ZG521FBDFYN00CW3D';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Test Apiary for Buying',
            'address' => 'Test Address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();
    }
}
