<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser\CreateRiserTest\fixtures;

use App\Domain\Beehive\BeeType;
use App\Infrastructure\Fixtures\Factory\ApiaryFactory;
use App\Infrastructure\Fixtures\Factory\BeehiveFactory;
use App\Infrastructure\Fixtures\Factory\UserFactory;
use Symfony\Component\Uid\Ulid;
use Zenstruck\Foundry\Story;

class CreateRiserStory extends Story
{
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_BEEHIVE = '01HF7X9YVA5GHKGDEPSPQG7187';
    public const ULID_APIARY_USER = '01HF9FR25AJ6W71ZC627CR0PH8';
    public const ULID_BEEHIVE_USER = '01HF9HT8104EDAEHHNRD99Y53R';

    public function build(): void
    {
        ApiaryFactory::new()->create([
            'name' => 'Apiary for user User',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY_USER))->save();

        ApiaryFactory::new()->create([
            'name' => 'Apiary for user Admin',
            'address' => 'Custom address',
            'user' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ])->forceSet('uid', new Ulid(self::ULID_APIARY))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for user User',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY_USER]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE_USER))->save();

        BeehiveFactory::new()->create([
            'name' => 'Beehive for user Admin',
            'bee' => BeeType::Buckfast,
            'age' => 2,
            'apiary' => ApiaryFactory::find(['uid' => self::ULID_APIARY]),
        ])->forceSet('uid', new Ulid(self::ULID_BEEHIVE))->save();
    }
}
