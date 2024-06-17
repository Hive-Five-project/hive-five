<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying\DeleteBuyingTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BuyingFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class DeleteBuyingStory extends Story
{
    public const ULID_BUYING = '01H5KQW6EBYNGSWRE09ANVZAER';
    public const ULID_BUYING_ADMIN = '01H5KQW6EBYNGSWRE09ANVZSSS';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';
    public const ULID_APIARY = '01HTWE9J2ZG521FBDFYN00CW3D';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Test Apiary for Buying',
            'address' => 'Test Address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        BuyingFactory::new()->create([
            'label' => 'Buying label',
            'price' => 100.00,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY]),
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BUYING))->save();

        BuyingFactory::new()->create([
            'label' => 'Buying label for admin',
            'price' => 100.00,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_ADMIN]),
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_BUYING_ADMIN))->save();
    }
}
