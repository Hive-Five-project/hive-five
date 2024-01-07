<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive\ListFramesTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Domain\Frame\FrameType;
use App\Domain\Riser\Riser;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\FrameFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class ListFramesStory extends Story
{
    public const ULID_APIARY_USER = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';

    public const ULID_BEEHIVE_USER = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_BEEHIVE_ADMIN = '01HF7XBCB9Q9T8DZN9F48SFPE2';

    public const ULID_FRAME_USER = '01HFHFN5QYNSW6NWHKDNY3ADDT';
    public const ULID_FRAME_ADMIN = '01HFHKAZ3VXSB93EAFBXQ528WJ';

    public function build(): void
    {
        /* Setup Apiaries */
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        ApiaryFactory::new()->create([
            'name' => 'Custom apiary for Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_ADMIN))->save();

        /* Beehives */
        $beehiveUser = BeehiveFactory::new()->create([
            'name' => 'Beehive for User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_USER))->save();

        $beehiveAdmin = BeehiveFactory::new()->create([
            'name' => 'Beehive for Admin',
            'bee' => BeeType::Black,
            'age' => 1,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_ADMIN))->save();

        /* Frames for Beehive */
        $frameUser = FrameFactory::new()->create([
            'label' => 'Frame for User',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_USER))->save();

        $frameAdmin = FrameFactory::new()->create([
            'label' => 'Frame for Admin',
            'type' => FrameType::Beehive,
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_FRAME_ADMIN))->save();

        /* Add riser Beehive */
        $beehiveAdmin->addFrame($frameAdmin->object());
        $beehiveUser->addFrame($frameUser->object());

        $beehiveAdmin->save();
        $beehiveUser->save();
    }
}
