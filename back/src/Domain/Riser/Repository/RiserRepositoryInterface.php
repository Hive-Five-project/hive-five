<?php

declare(strict_types=1);

namespace App\Domain\Riser\Repository;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Frame\Frame;
use App\Domain\Riser\Riser;
use Symfony\Component\Uid\Ulid;

/**
 * @method Riser[] findAll()
 */
interface RiserRepositoryInterface
{
    /**
     * @throws NotFoundException on no riser for given uid
     */
    public function getOneByUid(Ulid $uid): Riser;

    /**
     * @param Frame[] $frames
     *
     * @return bool true if frame is already related to another entity
     */
    public function isFrameAlreadyRelated(array $frames): bool;

    /**
     * @return Riser[]
     */
    public function listRisersFromBeehive(Beehive $beehive): array;

    public function save(Riser $riser): void;
}
