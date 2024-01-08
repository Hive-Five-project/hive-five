<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame\DeleteFrameTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\Frame\FrameType;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\RiserFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class DeleteFrameStory extends Story
{
    public const ULID_APIARY = '01HKN2NH5ZZA104ZHXZDKVFDNK';
    public const ULID_BEEHIVE = '01HKN2NV6TBX52GBQA7Q8M5PXD';
    public const ULID_RISER = '01HKNN32PW4VFC97WG8KG2S48S';

    public const ULID_FRAME_ADMIN = '01HKM79KK7CSEV3XE2YD6PRTGZ';
    public const ULID_FRAME_BEEHIVE = '01HKM53CVNRQDBHDHPZT4MGNYM';
    public const ULID_FRAME_RISER = '01HKNN777YKKXQ670C406FJFCP';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for Beehive',
            'address' => '2 rue Showbiz',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        $beehive = BeehiveFactory::new()->create([
            'name' => 'Custom beehive 1 for Beehive',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['name' => 'Custom apiary 1 for Beehive']),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE))->save();

        $riser = RiserFactory::new()->create([
            'name' => 'Riser for user',
            'beehive' => null,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_RISER))->save();

        $frameBeehive = FrameFactory::new()->create([
            'label' => 'Custom frame 1 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_BEEHIVE))->save();

        $frameRiser = FrameFactory::new()->create([
            'label' => 'Custom frame for riser',
            'type' => FrameType::Riser,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_RISER))->save();

        FrameFactory::new()->create([
            'label' => 'Custom frame 2 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_ADMIN))->save();

        $beehive->addFrame($frameBeehive->object());
        $beehive->save();

        $riser->addFrame($frameRiser->object());
        $riser->save();
    }
}
