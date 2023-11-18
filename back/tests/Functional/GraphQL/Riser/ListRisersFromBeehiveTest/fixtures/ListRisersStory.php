<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser\ListRisersFromBeehiveTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\User\User;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class ListRisersStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_BEEHIVE = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_RISER = '01HFHFN5QYNSW6NWHKDNY3ADDT';
    public const ULID_RISER_2 = '01HFHKAZ3VXSB93EAFBXQ528WJ';

    public const ULID_APIARY_OTHER = '01HFHKHDDNNEZJ1M1JHRTR6RTN';
    public const ULID_BEEHIVE_OTHER = '01HFHKHYJ0DAYMP4XSRXA7VZZE';
    public const ULID_RISER_OTHER = '01HFHFSQ7Z5NTV5F23HJZCGR9D';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE))->save();

        RiserFactory::new()->create([
            'name' => 'Riser for user User',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER))->save();

        RiserFactory::new()->create([
            'name' => 'Riser for user User',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER_2))->save();

        /* Another user */
        /** @var User $user */
        $user = UserFactory::find(['uid' => UserFactory::ULID_ADMIN])->object();

        ApiaryFactory::new()->create([
            'name' => 'Apiary for other user',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_OTHER))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for other user',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_OTHER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_OTHER))->save();

        RiserFactory::new()->create([
            'name' => 'Riser for user Admin',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE_OTHER]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER_OTHER))->save()
            ->forceSet('user', $user)->save();
    }
}
