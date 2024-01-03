<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive\UpdateBeehiveTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\Frame\FrameType;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class UpdateBeehiveStory extends Story
{
    public const ULID_APIARY_ADMIN = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const NEW_ULID_APIARY_USER = '01H5KQW6EBYNGSWRE09ANVREXY';
    public const ULID_APIARY_USER = '01HF9FR25AJ6W71ZC627CR0PH8';

    public const ULID_BEEHIVE = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_BEEHIVE_USER = '01HF9HT8104EDAEHHNRD99Y53R';

    public const ULID_FRAME_1_USER = '01HKME78E7CD3422JTYJ8JFSM9';
    public const ULID_FRAME_2_USER = '01HKME7XPAC7X57SDXTEXBHGBX';

    public const ULID_FRAME_1_ADMIN = '01HKME8HPA8YGSEZW9XP0DEF2A';
    public const ULID_FRAME_RISER = '01HKME8PK87YQXVMYR1EV6B2ED';

    public function build(): void
    {
        /* Apiary & Beehive for Admin */
        ApiaryFactory::new()->create([
            'name' => 'Apiary for user Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        ApiaryFactory::new()->create([
            'name' => 'Update Apiary for user',
            'address' => 'Custom address 2',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::NEW_ULID_APIARY_USER))->save();

        $beehiveAdmin = BeehiveFactory::new()->create([
            'name' => 'Beehive for Admin',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE))->save();

        /* Apiary & Beehive for another User */
        ApiaryFactory::new()->create([
            'name' => 'Apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        $beehiveUser = BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_USER))->save();

        /* Frames for Admin */
        $frameAdmin = FrameFactory::new()->create([
            'label' => 'Frame 1 for Admin',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_1_ADMIN))->save();

        FrameFactory::new()->create([
            'label' => 'Frame for riser',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_RISER))->save();

        /* Frames for another User */
        FrameFactory::new()->create([
            'label' => 'Frame 1 for user',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_1_USER))->save();

        FrameFactory::new()->create([
            'label' => 'Frame 2 for user',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_2_USER))->save();

        $beehiveAdmin->addFrame($frameAdmin->object());
        $beehiveAdmin->save();
    }
}
