<?php

declare(strict_types=1);

namespace App\Domain\Frame\Repository;

use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Frame\Frame;
use App\Domain\Frame\FrameType;
use Symfony\Component\Uid\Ulid;

/**
 * @method Frame[] findAll()
 */
interface FrameRepositoryInterface
{
    /**
     * @throws NotFoundException on no frame for given uid
     */
    public function getOneByUid(Ulid $uid): Frame;

    /**
     * @return FrameType[]
     */
    public function listFrameTypes(): array;

    public function save(Frame $frame): void;

    public function delete(Frame $frame): void;
}
