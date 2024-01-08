<?php

declare(strict_types=1);

namespace App\Domain\Beehive\Repository;

use App\Domain\Apiary\Apiary;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\BeeType;
use App\Domain\Common\Exception\NotFoundException;
use Symfony\Component\Uid\Ulid;

/**
 * @method Beehive[] findAll()
 */
interface BeehiveRepositoryInterface
{
    /**
     * @throws NotFoundException on no beehive for given uid
     */
    public function getOneByUid(Ulid $uid): Beehive;

    /**
     * @param Apiary $apiary Find all beehive by apiary
     *
     * @return Beehive[]
     */
    public function listBeehiveByApiary(Apiary $apiary): array;

    public function save(Beehive $beehive): void;

    /**
     * @return BeeType[]
     */
    public function listBeeTypes(): array;
}
