<?php

declare(strict_types=1);

namespace App\Infrastructure\Apiary\GraphQL\Resolver;

use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Apiary\Apiary;
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
    public function listAllByUser(Ulid $user): array
    {
        return $this->apiaryRepository->findByUid($user);
    }

    public function find(Ulid $uid): Apiary
    {
        return $this->withGraphQLErrorHandler(fn () => $this->apiaryRepository->getOneByUid($uid));
    }

    public static function getAliases(): array
    {
        return [
            'listAllByUser' => 'Apiary.list',
            'find' => 'Apiary.find',
        ];
    }
}
