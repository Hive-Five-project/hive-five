<?php

declare(strict_types=1);

namespace App\Domain\Buying\Repository;

use App\Domain\Buying\Buying;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;

/**
 * @method Buying[] findAll()
 */
interface BuyingRepositoryInterface
{
    /**
     * @throws NotFoundException on no buying for given uid
     */
    public function getOneByUid(Ulid $uid): Buying;

    public function save(Buying $buying): void;

    public function delete(Buying $buying): void;

    public function listMyBuyings(User $user): array;
}
