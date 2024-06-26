<?php

declare(strict_types=1);

namespace App\Infrastructure\Bridge\GraphQL\Type\Input;

use GraphQL\Type\Definition\FloatType;
use GraphQL\Type\Definition\ScalarType;

class FloatInputType extends InputType
{
    public const NAME = 'FloatInput';

    protected static function getName(): string
    {
        return self::NAME;
    }

    protected static function getInternalType(): ScalarType
    {
        return new FloatType();
    }
}
