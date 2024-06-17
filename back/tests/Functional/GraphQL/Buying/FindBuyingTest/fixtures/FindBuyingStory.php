<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying\FindBuyingTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BuyingFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class FindBuyingStory extends Story
{
    public const ULID_APIARY_USER = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';

    public const ULID_BUYING_USER = '01H5KQW6EBYNGSWRE09ANVZAER';
    public const ULID_BUYING_ADMIN = '01HF7XBCB9Q9T8DZN9F48SFPE2';

    public function build(): void
    {
        /* Setup Apiaries */
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        /* Buyings */
        BuyingFactory::new()->create([
            'label' => 'Buying for user',
            'price' => 100.00,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
            'date' => null,
        ])->forceSet('uid', new Ulid(self::ULID_BUYING_USER))->save();

        BuyingFactory::new()->create([
            'label' => 'Buying for Admin',
            'price' => 110.00,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_ADMIN]),
            'date' => new \DateTime('2024-04-30T15:11:40+00:00'),
        ])->forceSet('uid', new Ulid(self::ULID_BUYING_ADMIN))->save();
    }
}
