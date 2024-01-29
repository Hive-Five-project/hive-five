<?php

declare(strict_types=1);

namespace App\Infrastructure\Bridge\Symfony\Validator\Constraint;

use App\Domain\Frame\FrameType;
use Symfony\Component\Validator\Attribute\HasNamedArguments;
use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_METHOD | \Attribute::TARGET_PROPERTY)]
class FrameTypeMatch extends Constraint
{
    public const ATTRIBUTE_DOES_NOT_EXIST = '4168218e-0e09-4a54-b9d0-fdaf1061357d';

    protected const ERROR_NAMES = [
        self::ATTRIBUTE_DOES_NOT_EXIST => 'ATTRIBUTE_DOES_NOT_EXIST',
    ];

    #[HasNamedArguments]
    public function __construct(
        public FrameType $frameType,
        public string $message = 'The {{ attribute }} attribute exists.',
        array $groups = null,
        mixed $payload = null,
    ) {
        parent::__construct([], $groups, $payload);
    }
}
