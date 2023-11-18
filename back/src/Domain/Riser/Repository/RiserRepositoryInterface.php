<?php

declare(strict_types=1);

namespace App\Domain\Riser\Repository;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Riser\Riser;
use Symfony\Component\Uid\Ulid;

/**
 * @method Beehive[] findAll()
 */
interface RiserRepositoryInterface
{
    /**
     * @throws NotFoundException on no riser for given uid
     */
    public function getOneByUid(Ulid $uid): Riser;

    /**
     * @return Riser[]
     */
    public function listRiserByBeehive(Beehive $beehive): array;

    public function save(Riser $riser): void;
}
