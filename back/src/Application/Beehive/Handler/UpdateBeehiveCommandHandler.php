<?php

declare(strict_types=1);

namespace App\Application\Beehive\Handler;

use App\Application\Beehive\Command\UpdateBeehiveCommand;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Frame\Repository\FrameRepositoryInterface;

class UpdateBeehiveCommandHandler
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function __invoke(UpdateBeehiveCommand $command): Beehive
    {
        $beehive = $this->beehiveRepository->getOneByUid($command->beehiveUid);
        $payload = $command->payload;

        $apiary = $this->apiaryRepository->getOneByUid($payload->apiary);
        if ($apiary->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot update beehive in this apiary %s', $command->currentUser->getEmail(), $apiary->getUidAsString()));
        }

        $frames = $this->frameRepository->findByUids((array) $payload->frames);

        if ($this->beehiveRepository->isFrameAlreadyRelated($frames)) {
            throw new ForbiddenException(sprintf('Frames is already used by another beehive'));
        }

        $beehive->update(
            $payload->name,
            $payload->bee,
            $payload->age,
            $apiary,
            $frames,
        );

        return $beehive;
    }
}
