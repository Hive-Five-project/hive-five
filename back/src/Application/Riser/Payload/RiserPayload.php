<?php

declare(strict_types=1);

namespace App\Application\Riser\Payload;

use App\Domain\Beehive\Beehive;
use App\Domain\Frame\Frame;
use App\Domain\Frame\FrameType;
use App\Infrastructure\Bridge\GraphQL\Type\Input\StringInputType;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\EntityReferenceExists;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\FrameTypeMatch;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[GQL\Input(name: 'RiserPayload')]
final class RiserPayload
{
    public function __construct(
        /**
         * @internal Only for validation purposes, when updating a riser (it's the riser uid).
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
    public $name;

    /** @var Ulid|null */
    #[GQL\Field(type: 'ULIDInput')]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\Type(Ulid::class),
        new EntityReferenceExists(
            Beehive::class,
            identityField: 'uid',
            message: 'The beehive {{ value }} does not exist.',
        ),
    ])]
    public $beehive;

    /** @var Ulid[]|null */
    #[GQL\Field(type: '[ULIDInput]')]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotNull(),
        new Assert\Type('array'),
    ])]
    #[Assert\All([
        new Assert\Type(Ulid::class),
        new Assert\NotBlank(),
        new EntityReferenceExists(
            Frame::class,
            identityField: 'uid',
            message: 'The frame {{ value }} does not exist.',
        ),
        new FrameTypeMatch(
            frameType: FrameType::Riser,
            message: 'The frame {{ value }} type is not valid.',
        ),
    ])]
    public $frames = [];
}
