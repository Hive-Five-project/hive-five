<?php

declare(strict_types=1);

namespace App\Application\Apiary\Payload;

use App\Domain\User\User;
use App\Domain\Apiary\Apiary;
use App\Infrastructure\Bridge\GraphQL\Type\Input\StringInputType;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\EntityReferenceDoesNotExist;
use App\Infrastructure\Bridge\Symfony\Validator\Constraint\EntityReferenceExists;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[GQL\Input(name: 'ApiaryPayload')]
final class ApiaryPayload
{
    public function __construct(
        /**
         * @internal Only for validation purposes, when updating a service (it's the service uid).
         */
        public readonly ?Ulid $uid = null
    ) {
    }
    /** @var string */
    #[GQL\Field(type: StringInputType::NAME)]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\Type('string'),
        new Assert\Length(min: 2, max: 255),
        new EntityReferenceDoesNotExist(
            Apiary::class,
            identityField: 'name',
            currentObjectComparisonMethod: 'compareFoundReferenceToCurrentObject',
            message: 'The name {{ value }} is already used.',
        ),
    ])]
    public $name;

    /** @var string */
    #[GQL\Field(type: StringInputType::NAME)]
    #[GQL\Description('Mandatory')]
    #[Assert\NotNull]
    public $address;

    /** @var Ulid */
    #[GQL\Field(type: 'ULIDInput')]
    #[GQL\Description('Mandatory')]
    #[Assert\Sequentially([
        new Assert\NotBlank(),
        new Assert\Type(Ulid::class),
        new Assert\Length(min: 2, max: 255),
        new EntityReferenceExists(
            User::class,
            identityField: 'uid',
            message: 'The user {{ value }} does not exist.',
        ),
    ])]
    public $user;

    /**
     * Exclude the current object from the EntityReferenceDoesNotExist violations.
     */
    public function compareFoundReferenceToCurrentObject(): callable
    {
        return fn (Apiary $foundApiary): bool => $foundApiary->getUid()->equals($this->uid);
    }
}
