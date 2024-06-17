<?php

declare(strict_types=1);

namespace App\Infrastructure\Bridge\GraphQL\Type\Input;

use App\Infrastructure\Bridge\GraphQL\Type\DateTimeType;
use GraphQL\Type\Definition\ScalarType;

class DateTimeInputType extends InputType
{
    public const NAME = 'DateTimeInput';

    protected static function getName(): string
    {
        return self::NAME;
    }

    protected static function getInternalType(): ScalarType
    {
        return new DateTimeType();
    }
}
