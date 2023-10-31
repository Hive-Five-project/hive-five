<?php

declare(strict_types=1);

namespace App\Infrastructure\Apiary\Repository;

use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Apiary\Apiary;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Ulid;

/**
 * @extends ServiceEntityRepository<Apiary>
 */
class ApiaryRepository extends ServiceEntityRepository implements ApiaryRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Apiary::class);
    }

    public function getOneByUid(Ulid $uid): Apiary
    {
        $apiary = $this->findOneBy(['uid' => $uid]);

        if (!$apiary instanceof Apiary) {
            throw new NotFoundException(sprintf('Apiary with UID "%s" not found', $uid));
        }

        return $apiary;
    }

    public function findByUid(Ulid $userUid): array
    {
        $qb = $this->createQueryBuilder('apiaries')
            ->where('apiaries.user = (:uid)')
            ->setParameter('uid', $userUid)
        ;

        /**
         * @var Apiary[] $results
         */
        $results = $qb->getQuery()->getResult();

        return $results;
    }

    public function save(Apiary $apiary): void
    {
        $this->getEntityManager()->persist($apiary);
    }
}
