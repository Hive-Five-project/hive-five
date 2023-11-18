<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser\UpdateRiserTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\User\User;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class UpdateRiserStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_OTHER = '01HF9FR25AJ6W71ZC627CR0PH8';
    public const ULID_BEEHIVE = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_BEEHIVE_OTHER = '01HF9HT8104EDAEHHNRD99Y53R';
    public const NEW_ULID_BEEHIVE = '01HFHFN0YPSWQRF30ZJDNA0SAM';
    public const ULID_RISER = '01HFHFN5QYNSW6NWHKDNY3ADDT';
    public const ULID_RISER_OTHER = '01HFHFSQ7Z5NTV5F23HJZCGR9D';

    public function build(): void
    {
        /* random datas */
        ApiaryFactory::new()->create([
            'name' => 'Apiary for user Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_OTHER))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for user Admin',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_OTHER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_OTHER))->save();

        /** @var User $user */
        $user = UserFactory::find(['uid' => UserFactory::ULID_ADMIN])->object();

        RiserFactory::new()->create([
            'name' => 'Riser for user Admin',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE_OTHER]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER_OTHER))->save()
            ->forceSet('user', $user)->save();

        /* current User data's */
        ApiaryFactory::new()->create([
            'name' => 'Apiary for user User',
            'address' => 'Custom address 2',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY]),
        ])->forceSet('uid', new Ulid(self::NEW_ULID_BEEHIVE))->save();

        RiserFactory::new()->create([
            'name' => 'Riser for User',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER))->save();
    }
}
