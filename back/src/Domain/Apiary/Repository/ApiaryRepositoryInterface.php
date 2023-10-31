<?php

declare(strict_types=1);

namespace App\Domain\Apiary\Repository;

use App\Domain\Common\Exception\NotFoundException;
use App\Domain\Apiary\Apiary;
use Symfony\Component\Uid\Ulid;

/**
 * @method Apiary[] findAll()
 */
interface ApiaryRepositoryInterface
{
    /**
     * @throws NotFoundException on no apiary for given uid
     */
    public function getOneByUid(Ulid $uid): Apiary;

    /**
     * @param Ulid $userUid Find all apiaries by User UID
     * @return Apiary[]
     */
    public function findByUid(Ulid $userUid): array;

    public function save(Apiary $apiary): void;
}
