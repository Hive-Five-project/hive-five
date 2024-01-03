<?php

declare(strict_types=1);

namespace App\Application\Riser\Handler;

use App\Application\Riser\Command\UpdateRiserCommand;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Frame\Repository\FrameRepositoryInterface;
use App\Domain\Riser\Repository\RiserRepositoryInterface;
use App\Domain\Riser\Riser;

class UpdateRiserCommandHandler
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly RiserRepositoryInterface $riserRepository,
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function __invoke(UpdateRiserCommand $command): Riser
    {
        $riser = $this->riserRepository->getOneByUid($command->riserUid);
        $payload = $command->payload;
        $beehive = null;

        if ($riser->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot update riser isn\'t his own : %s not UPDATED.', $command->currentUser->getEmail(), $riser->getUidAsString()));
        }

        if (isset($payload->beehive)) {
            $beehive = $this->beehiveRepository->getOneByUid($payload->beehive);
        }

        if (isset($beehive) && $beehive->getApiary()->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot update a Riser and associate it in a unknown beehive %s', $command->currentUser->getEmail(), $beehive->getUidAsString()));
        }

        $frames = $this->frameRepository->findByUids((array) $payload->frames);

        if ($this->riserRepository->isFrameAlreadyRelated($frames)) {
            throw new ForbiddenException(sprintf('Frames is already used by another riser'));
        }

        $riser->update(
            $payload->name,
            $beehive,
            $frames,
        );

        return $riser;
    }
}
