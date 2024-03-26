<?php

declare(strict_types=1);

namespace App\Application\Buying\Payload;

use App\Domain\Apiary\Apiary;
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

    #[GQL\Field(type: 'String')]
    #[GQL\Description('The label of the buying.')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\Type('string'),
        new Assert\Length(min: 2, max: 255),
    ])]
    public string $label;

    #[GQL\Field(type: 'Float')]
    #[GQL\Description('The price of the buying.')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\Type('float'),
    ])]
    public float $price;

    #[GQL\Field(type: 'DateTime')]
    #[GQL\Description('The date of the buying.')]
    #[Assert\Type(\DateTime::class)]
    public ?\DateTime $date = null;

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

    public function compareFoundReferenceToCurrentObject(): callable
    {
        return function ($foundBuying): bool {
            return $this->uid !== null && $foundBuying->getUlid()->equals($this->uid);
        };
    }
}
