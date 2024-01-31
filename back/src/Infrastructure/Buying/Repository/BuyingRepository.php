<?php

declare(strict_types=1);

namespace App\Infrastructure\Buying\Repository;

use App\Domain\Buying\Buying;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;
use App\Domain\Common\Exception\NotFoundException;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Ulid;

/**
 * @extends ServiceEntityRepository<Buying>
 */
class BuyingRepository extends ServiceEntityRepository implements BuyingRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Buying::class);
    }

    public function getOneByUid(Ulid $uid): Buying
    {
        $buying = $this->findOneBy(['uid' => $uid]);

        if (!$buying instanceof Buying) {
            throw new NotFoundException(sprintf('Buying with UID "%s" not found', $uid));
        }

        return $buying;
    }

    public function save(Buying $buying): void
    {
        $this->getEntityManager()->persist($buying);
    }

    public function delete(Buying $buying): void
    {
        $this->getEntityManager()->remove($buying);
    }
}
