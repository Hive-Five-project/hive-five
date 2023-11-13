<?php

declare(strict_types=1);

namespace App\Infrastructure\Beehive\GraphQL\Resolver;

use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Infrastructure\Bridge\GraphQL\Resolver\AbstractResolver;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class BeehiveResolver extends AbstractResolver implements AliasedInterface
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    /**
     * @return array<Beehive>
     */
    public function listBeehivesFromApiary(Ulid $apiaryUid): array
    {
        return $this->withGraphQLErrorHandler(
            function () use ($apiaryUid) {
                $apiary = $this->apiaryRepository->getOneByUid($apiaryUid);

                if ($apiary->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access this beehive with %s', $this->getDomainUser()->getEmail(), $apiary->getUidAsString()));
                }

                return $this->beehiveRepository->listBeehiveByApiary($apiary);
            }
        );
    }

    public function find(Ulid $uid): Beehive
    {
        return $this->withGraphQLErrorHandler(
            function () use ($uid) {
                $beehive = $this->beehiveRepository->getOneByUid($uid);
                if ($beehive->getApiary()->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access beehive with %s', $this->getDomainUser()->getEmail(), $beehive->getUidAsString()));
                }

                return $beehive;
            });
    }

    public function listBeeType(): array
    {
        return $this->beehiveRepository->listBeeTypes();
    }

    public static function getAliases(): array
    {
        return [
            'listBeehivesFromApiary' => 'Beehive.list',
            'find' => 'Beehive.find',
            'listBeeType' => 'Beehive.listBeeType',
        ];
    }
}
