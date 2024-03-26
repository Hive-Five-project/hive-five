<?php

declare(strict_types=1);

namespace App\Infrastructure\Buying\GraphQL\Resolver;

use App\Domain\Buying\Buying;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Infrastructure\Bridge\GraphQL\Resolver\AbstractResolver;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class BuyingResolver extends AbstractResolver implements AliasedInterface
{
    public function __construct(
        private readonly BuyingRepositoryInterface $buyingRepository,
    ) {
    }

    /**
     * @return array<Buying>
     */
    public function listMyBuyings(): array
    {
        return $this->buyingRepository->listMyBuyings($this->getDomainUser());
    }

    public function find(Ulid $uid): Buying
    {
        return $this->withGraphQLErrorHandler(
            function () use ($uid) {
                $buying = $this->buyingRepository->getOneByUid($uid);
                if ($buying->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access buying %s', $this->getDomainUser()->getEmail(), $buying->getUid()->toRfc4122()));
                }

                return $buying;
            }
        );
    }

    public static function getAliases(): array
    {
        return [
            'listMyBuyings' => 'Buying.list',
            'find' => 'Buying.find',
        ];
    }
}
