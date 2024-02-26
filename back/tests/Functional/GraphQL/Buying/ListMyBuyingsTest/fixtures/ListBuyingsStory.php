<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Buying\ListMyBuyingsTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BuyingFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class ListBuyingsStory extends Story
{
    public const ULID_APIARY_USER = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_BUYING_USER = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_BUYING_ADMIN = '01HF7XBCB9Q9T8DZN9F48SFPE2';

    public function build(): void
    {
        /* Setup Apiaries */
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        /* Buyings */
        BuyingFactory::new()->create([
            'label' => 'Buying for User',
            'price' => 100.00,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BUYING_USER))->save();

        BuyingFactory::new()->create([
            'label' => 'Buying for Admin',
            'price' => 110.00,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
            'apiary' => null,
        ])->forceSet('uid', new Ulid(self::ULID_BUYING_ADMIN))->save();
    }
}
