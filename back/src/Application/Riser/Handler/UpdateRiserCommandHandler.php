<?php

declare(strict_types=1);

namespace App\Application\Riser\Handler;

use App\Application\Riser\Command\UpdateRiserCommand;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Riser\Repository\RiserRepositoryInterface;
use App\Domain\Riser\Riser;

class UpdateRiserCommandHandler
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly RiserRepositoryInterface $riserRepository,
    ) {
    }

    public function __invoke(UpdateRiserCommand $command): Riser
    {
        $riser = $this->riserRepository->getOneByUid($command->riserUid);
        $payload = $command->payload;
        $beehive = null;

        if (isset($payload->beehive)) {
            $beehive = $this->beehiveRepository->getOneByUid($payload->beehive);
        }

        if ($riser->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot update riser isn\'t his : %s not updated.', $command->currentUser->getEmail(), $riser->getUidAsString()));
        }

        $riser->update(
            $payload->name,
            $beehive,
        );

        return $riser;
    }
}
