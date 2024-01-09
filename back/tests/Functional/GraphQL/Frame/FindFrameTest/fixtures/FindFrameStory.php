<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive\FindFrameTest\fixtures;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class FindFrameStory extends Story
{
    public const ULID_FRAME_ADMIN = '01HKM79KK7CSEV3XE2YD6PRTGZ';
    public const ULID_FRAME = '01HKM53CVNRQDBHDHPZT4MGNYM';

    public function build(): void
    {
        FrameFactory::new()->create([
            'label' => 'Custom frame 1 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME))->save();

        FrameFactory::new()->create([
            'label' => 'Custom frame 2 for Beehive',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_ADMIN))->save();
    }
}
