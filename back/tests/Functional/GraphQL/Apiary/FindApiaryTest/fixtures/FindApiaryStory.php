<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary\FindApiaryTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class FindApiaryStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_2 = '01H82DFYZMANTX4N4FES76RDF0';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';
    public const ULID_APIARY_ADMIN_2 = '01HE39M6CXC360KVZ6R08MP669';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 2 for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_2))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 2 for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN_2))->save();
    }
}
