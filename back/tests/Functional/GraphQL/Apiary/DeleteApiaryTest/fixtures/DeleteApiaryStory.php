<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Apiary\DeleteApiaryTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class DeleteApiaryStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';
    public const ULID_APIARY_WITH_BEES = '01HF30NQ48NZDA9MYG38MBK8WV';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_WITH_BEES))->save();

        BeehiveFactory::new()->create([
            'name' => 'Custom beehive 1',
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_WITH_BEES]),
        ])->save();
    }
}
