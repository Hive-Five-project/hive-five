<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame\UpdateFrameTest\fixtures;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class UpdateFrameStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_BEEHIVE = '01HKM4XE3S2YHGW7SVPGK2N4BM';
    public const ULID_FRAME = '01HKM53CVNRQDBHDHPZT4MGNYM';
    public const ULID_FRAME_ADMIN = '01HKM79KK7CSEV3XE2YD6PRTGZ';

    public function build(): void
    {
        FrameFactory::new()->create([
            'label' => 'Custom frame 1 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME))->save();

        FrameFactory::new()->create([
            'label' => 'Custom frame 1 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_ADMIN))->save();
    }
}
