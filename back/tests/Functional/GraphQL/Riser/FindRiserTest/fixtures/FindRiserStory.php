<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser\FindRiserTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\User\User;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class FindRiserStory extends Story
{
    public const ULID_APIARY_USER = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_BEEHIVE_USER = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_RISER = '01HFHFN5QYNSW6NWHKDNY3ADDT';
    public const ULID_RISER_OTHER = '01HFHFSQ7Z5NTV5F23HJZCGR9D';

    public function build(): void
    {
        /* Setup Apiaries */
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        /* Beehives */
        BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_USER))->save();

        RiserFactory::new()->create([
            'name' => 'Riser for user User',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER))->save();

        /** @var User $user */
        $user = UserFactory::find(['uid' => UserFactory::ULID_ADMIN])->object();

        RiserFactory::new()->create([
            'name' => 'Riser for user Admin',
        ])->forceSet('uid', new Ulid(self::ULID_RISER_OTHER))->save()
            ->forceSet('user', $user)->save();
    }
}
