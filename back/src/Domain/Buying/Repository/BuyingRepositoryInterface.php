<?php

declare(strict_types=1);

namespace App\Domain\Buying\Repository;

use App\Domain\Buying\Buying;
use App\Domain\Common\Exception\NotFoundException;
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

    /*
      @param Apiary $apiary Modify buying of apiary
     
     
    public function modifyBuying(Apiary $apiary): void;*/

    public function save(Buying $buying): void;

    public function delete(Buying $buying): void;
}
