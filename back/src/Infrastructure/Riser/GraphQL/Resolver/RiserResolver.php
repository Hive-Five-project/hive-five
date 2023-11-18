<?php

declare(strict_types=1);

namespace App\Infrastructure\Riser\GraphQL\Resolver;

use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Riser\Repository\RiserRepositoryInterface;
use App\Domain\Riser\Riser;
use App\Infrastructure\Bridge\GraphQL\Resolver\AbstractResolver;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class RiserResolver extends AbstractResolver implements AliasedInterface
{
    public function __construct(
        private readonly RiserRepositoryInterface $riserRepository,
        private readonly BeehiveRepositoryInterface $beehiveRepository,
    ) {
    }

    /**
     * @return array<Riser>
     */
    public function listRisersFromBeehive(Ulid $beehiveUid): array
    {
        return $this->withGraphQLErrorHandler(
            function () use ($beehiveUid) {
                $beehive = $this->beehiveRepository->getOneByUid($beehiveUid);

                if ($beehive->getApiary()->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access this riser with this beehive%s', $this->getDomainUser()->getEmail(), $beehive->getUidAsString()));
                }

                return $this->riserRepository->listRisersFromBeehive($beehive);
            }
        );
    }

    public function find(Ulid $uid): Riser
    {
        return $this->withGraphQLErrorHandler(
            function () use ($uid) {
                $riser = $this->riserRepository->getOneByUid($uid);
                if ($riser->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access riser with %s', $this->getDomainUser()->getEmail(), $riser->getUidAsString()));
                }

                return $riser;
            });
    }

    public static function getAliases(): array
    {
        return [
            'listRisersFromBeehive' => 'Riser.list',
            'find' => 'Riser.find',
        ];
    }
}
