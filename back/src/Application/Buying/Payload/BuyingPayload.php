<?php

declare(strict_types=1);

namespace App\Application\Buying\Payload;

use App\Domain\Apiary\Apiary;
use App\Infrastructure\Bridge\GraphQL\Type\Input\FloatInputType;
use App\Infrastructure\Bridge\GraphQL\Type\Input\StringInputType;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\EntityReferenceExists;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[GQL\Input(name: 'BuyingPayload')]
final class BuyingPayload
{
    public function __construct(
        /**
         * @internal Only for validation purposes, when updating a buying (it's the buying uid).
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

    /** @var float */
    #[GQL\Field(type: FloatInputType::NAME)]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\NotNull(),
        new Assert\Type('float'),
        new Assert\Positive(),
    ])]
    public $price;

    #[GQL\Field(type: 'DateTime')]
    #[GQL\Description('The date of the buying.')]
    #[Assert\Type(\DateTime::class)]
    public ?\DateTime $date = null;

    #[GQL\Field(type: 'ULIDInput')]
    #[GQL\Description('Optional')]
    #[Assert\Sequentially([
        new Assert\Type(Ulid::class),
        new Assert\NotBlank(allowNull: true),
        new EntityReferenceExists(
            Apiary::class,
            identityField: 'uid',
            message: 'The apiary {{ value }} does not exist.',
        ),
    ])]
    public ?Ulid $apiary = null;
}
