<?php

declare(strict_types=1);

namespace App\Domain\Apiary\Repository;

use App\Domain\Apiary\Apiary;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\User\User;
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
     * @param User $user Find all apiaries by User
     *
     * @return Apiary[]
     */
    public function listMyApiaries(User $user): array;

    public function save(Apiary $apiary): void;

    public function delete(Apiary $apiary): void;
}
