<?php

declare(strict_types=1);

namespace App\Infrastructure\Beehive\Type;

use App\Domain\Beehive\BeeType;
use App\Infrastructure\Bridge\GraphQL\Type\PhpEnumType;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class BeeTypeEnumType extends PhpEnumType implements AliasedInterface
{
    public function __construct()
    {
        parent::__construct(BeeType::class, self::getAliases()[0]);
    }

    public static function getAliases(): array
    {
        return ['BeeTypeEnum'];
    }
}
