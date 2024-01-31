<?php

declare(strict_types=1);

namespace App\Infrastructure\Bridge\Symfony\Validator\Constraint;

use App\Domain\Frame\Repository\FrameRepositoryInterface;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class FrameTypeMatchValidator extends ConstraintValidator
{
    public function __construct(private readonly FrameRepositoryInterface $frameRepository)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof FrameTypeMatch) {
            throw new UnexpectedTypeException($constraint, FrameTypeMatch::class);
        }

        if ($value === null || $value === '') {
            // noop
            return;
        }

        if (!$value instanceof Ulid) {
            throw new UnexpectedTypeException($value, Ulid::class);
        }

        $entity = $this->frameRepository->getOneByUid($value);

        if ($entity->getType() !== $constraint->frameType) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $this->formatValue($value))
                ->setCode(FrameTypeMatch::ATTRIBUTE_DOES_NOT_EXIST)
                ->addViolation()
            ;
        }
    }
}
