<?php

declare(strict_types=1);

namespace App\Infrastructure\Frame\Type;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Bridge\GraphQL\Type\PhpEnumType;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class FrameTypeEnumType extends PhpEnumType implements AliasedInterface
{
    public function __construct()
    {
        parent::__construct(FrameType::class, self::getAliases()[0]);
    }

    public static function getAliases(): array
    {
        return ['FrameTypeEnum'];
    }
}
