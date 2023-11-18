<?php

declare(strict_types=1);

namespace App\Infrastructure\Riser\Repository;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Riser\Repository\RiserRepositoryInterface;
use App\Domain\Riser\Riser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Ulid;

/**
 * @extends ServiceEntityRepository<Riser>
 */
class RiserRepository extends ServiceEntityRepository implements RiserRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Riser::class);
    }

    public function getOneByUid(Ulid $uid): Riser
    {
        $riser = $this->findOneBy(['uid' => $uid]);

        if (!$riser instanceof Riser) {
            throw new NotFoundException(sprintf('Riser with UID "%s" not found', $uid));
        }

        return $riser;
    }

    public function listRiserByBeehive(Beehive $beehive): array
    {
        return $this->findBy(['beehive' => $beehive]);
    }

    public function save(Riser $riser): void
    {
        $this->getEntityManager()->persist($riser);
    }
}
