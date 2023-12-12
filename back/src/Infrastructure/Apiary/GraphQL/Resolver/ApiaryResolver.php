<?php

declare(strict_types=1);

namespace App\Infrastructure\Apiary\GraphQL\Resolver;

use App\Domain\Apiary\Apiary;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Infrastructure\Bridge\GraphQL\Resolver\AbstractResolver;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class ApiaryResolver extends AbstractResolver implements AliasedInterface
{
    public function __construct(
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    /**
     * @return array<Apiary>
     */
    public function listMyApiaries(): array
    {
        return $this->apiaryRepository->listMyApiaries($this->getDomainUser());
    }

    public function find(Ulid $uid): Apiary
    {
        return $this->withGraphQLErrorHandler(
            function () use ($uid) {
                $apiary = $this->apiaryRepository->getOneByUid($uid);
                if ($apiary->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(sprintf('User %s cannot access apiary %s', $this->getDomainUser()->getEmail(), $apiary->getUidAsString()));
                }

                return $apiary;
            }
        );
    }

    public static function getAliases(): array
    {
        return [
            'listMyApiaries' => 'Apiary.list',
            'find' => 'Apiary.find',
        ];
    }
}
