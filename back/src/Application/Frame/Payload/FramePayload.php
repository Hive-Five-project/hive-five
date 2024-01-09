<?php

declare(strict_types=1);

namespace App\Application\Frame\Payload;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Bridge\GraphQL\Type\Input\StringInputType;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[GQL\Input(name: 'FramePayload')]
final class FramePayload
{
    public function __construct(
        /**
         * @internal Only for validation purposes, when updating a frame (it's the frame uid).
         */
        public readonly ?Ulid $uid = null
    ) {
    }

    /** @var string */
    #[GQL\Field(type: StringInputType::NAME)]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
        new Assert\Type('string'),
        new Assert\Length(min: 2, max: 255),
    ])]
    public $label;

    /** @var FrameType */
    #[GQL\Field(type: 'FrameTypeEnum')]
    #[GQL\Description('Mandatory')]
    #[Assert\Type(FrameType::class)]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
    ])]
    public $type;
}
