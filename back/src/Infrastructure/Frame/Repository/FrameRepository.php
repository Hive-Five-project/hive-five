<?php

declare(strict_types=1);

namespace App\Infrastructure\Frame\Repository;

use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Frame\Frame;
use App\Domain\Frame\FrameType;
use App\Domain\Frame\Repository\FrameRepositoryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Ulid;

/**
 * @extends ServiceEntityRepository<Frame>
 */
class FrameRepository extends ServiceEntityRepository implements FrameRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Frame::class);
    }

    public function getOneByUid(Ulid $uid): Frame
    {
        $frame = $this->findOneBy(['uid' => $uid]);

        if (!$frame instanceof Frame) {
            throw new NotFoundException(sprintf('Frame with UID "%s" not found', $uid));
        }

        return $frame;
    }

    public function findByUids(array $uids): array
    {
        $qb = $this->createQueryBuilder('frame')
            ->andWhere('frame.uid IN (:uids)')
            ->setParameter('uids', array_map(fn (Ulid $uid) => $uid->toRfc4122(), $uids))
        ;

        /**
         * @var Frame[] $results
         */
        $results = $qb->getQuery()->getResult();

        return $results;
    }

    public function listFrameTypes(): array
    {
        return FrameType::cases();
    }

    public function save(Frame $frame): void
    {
        $this->getEntityManager()->persist($frame);
    }

    public function delete(Frame $frame): void
    {
        $this->getEntityManager()->remove($frame);
    }
}
