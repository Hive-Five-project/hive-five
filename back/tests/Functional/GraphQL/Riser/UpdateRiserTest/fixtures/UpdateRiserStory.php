<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser\UpdateRiserTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\Frame\FrameType;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class UpdateRiserStory extends Story
{
    public const ULID_APIARY = '01HFHMTTQ8GMG8VQF8RS9KRCMV';
    public const ULID_APIARY_OTHER = '01HFHMV0E0QHNN47ASVX6V16M9';

    public const ULID_BEEHIVE = '01HFHMV5S77FWWEHCB0941J453';
    public const ULID_BEEHIVE_OTHER = '01HFHMVC7VAXWV38B00Q03EXFE';

    public const NEW_ULID_BEEHIVE = '01HFHMVJ1RC69F49VNNEWTGKCJ';

    public const ULID_RISER = '01HFHMVQTZ1REEMJ0PK69P6YBT';
    public const ULID_RISER_OTHER = '01HFHMVWRC9N2TDWH8F69X5XSC';

    public const ULID_FRAME_1 = '01HKNKP0SHZPHGRSQYEJ7T68XP';
    public const ULID_FRAME_2 = '01HKNKP6J9SWNCWMHYQ8F8K05P';
    public const ULID_FRAME_BEEHIVE = '01HKNKYC0BH2JC23M1Q056GYNZ';

    public const ULID_FRAME_1_OTHER = '01HKNKQZ8VH7VSYDE510HWJ3T1';
    public const ULID_FRAME_2_OTHER = '01HKNKR4GK1V37HX5R0MBX2X89';

    public function build(): void
    {
        /* Admin data's */
        ApiaryFactory::new()->create([
            'name' => 'Apiary for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_OTHER))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for Admin',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_OTHER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_OTHER))->save();

        $riserAdmin = RiserFactory::new()->create([
            'name' => 'Riser for user Admin',
            'beehive' => BeehiveFactory::find(['uid' => self::ULID_BEEHIVE_OTHER]),
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER_OTHER))->save();

        $frameAdmin = FrameFactory::new()->create([
            'label' => 'Frame riser for admin',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_1_OTHER))->save();

        $riserAdmin->addFrame($frameAdmin->object());
        $riserAdmin->save();

        FrameFactory::new()->create([
            'label' => 'Frame 2 riser for admin',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_2_OTHER))->save();

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
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER))->save();

        FrameFactory::new()->create([
            'label' => 'Frame riser for user',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_1))->save();

        FrameFactory::new()->create([
            'label' => 'Frame 2 riser for user',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_2))->save();

        FrameFactory::new()->create([
            'label' => 'Frame beehive for user',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_BEEHIVE))->save();
    }
}
