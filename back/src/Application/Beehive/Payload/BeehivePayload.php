<?php

declare(strict_types=1);

namespace App\Application\Beehive\Payload;

use App\Domain\Apiary\Apiary;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\BeeType;
use App\Infrastructure\Bridge\GraphQL\Type\Input\IntInputType;
use App\Infrastructure\Bridge\GraphQL\Type\Input\StringInputType;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\EntityReferenceExists;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[GQL\Input(name: 'BeehivePayload')]
final class BeehivePayload
{
    public function __construct(
        /**
         * @internal Only for validation purposes, when updating a beehive (it's the beehive uid).
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

    /** @var BeeType */
    #[GQL\Field(type: 'BeeTypeEnum')]
    #[GQL\Description('Mandatory')]
    #[Assert\Type(BeeType::class)]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
    ])]
    public $bee;

    /** @var int */
    #[GQL\Field(type: IntInputType::NAME)]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
        new Assert\Type('int'),
        new Assert\Positive(),
    ])]
    public $age;

    /** @var Ulid */
    #[GQL\Field(type: 'ULIDInput')]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
        new Assert\Type(Ulid::class),
        new EntityReferenceExists(
            Apiary::class,
            identityField: 'uid',
            message: 'The apiary {{ value }} does not exist.',
        ),
    ])]
    public $apiary;
}
