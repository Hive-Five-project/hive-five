<?php

declare(strict_types=1);

namespace App\Infrastructure\Beehive\Repository;

use App\Domain\Apiary\Apiary;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\BeeType;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\NotFoundException;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Ulid;

/**
 * @extends ServiceEntityRepository<Beehive>
 */
class BeehiveRepository extends ServiceEntityRepository implements BeehiveRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Beehive::class);
    }

    public function getOneByUid(Ulid $uid): Beehive
    {
        $beehive = $this->findOneBy(['uid' => $uid]);

        if (!$beehive instanceof Beehive) {
            throw new NotFoundException(sprintf('Beehive with UID "%s" not found', $uid));
        }

        return $beehive;
    }

    public function listBeehiveByApiary(Apiary $apiary): array
    {
        return $this->findBy(['apiary' => $apiary]);
    }

    public function listBeeTypes(): array
    {
        return BeeType::cases();
    }

    public function save(Beehive $beehive): void
    {
        $this->getEntityManager()->persist($beehive);
    }
}
