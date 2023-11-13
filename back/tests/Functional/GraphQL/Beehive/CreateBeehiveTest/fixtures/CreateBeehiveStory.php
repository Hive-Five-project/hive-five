<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Beehive\CreateBeehiveTest\fixtures;

use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class CreateBeehiveStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Custom apiary 1 for User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();
    }
}
