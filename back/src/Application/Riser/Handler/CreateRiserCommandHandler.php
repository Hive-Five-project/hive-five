<?php

declare(strict_types=1);

namespace App\Application\Riser\Handler;

use App\Application\Riser\Command\CreateRiserCommand;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Riser\Repository\RiserRepositoryInterface;
use App\Domain\Riser\Riser;

class CreateRiserCommandHandler
{
    public function __construct(
        private readonly RiserRepositoryInterface $riserRepository,
        private readonly BeehiveRepositoryInterface $beehiveRepository,
    ) {
    }

    public function __invoke(CreateRiserCommand $command): Riser
    {
        $payload = $command->payload;
        $user = $command->currentUser;
        $beehive = null;

        if (isset($payload->beehive)) {
            $beehive = $this->beehiveRepository->getOneByUid($payload->beehive);
        }
        if (isset($beehive) && $beehive->getApiary()->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot create a Riser and associate it in a unknown beehive %s', $command->currentUser->getEmail(), $beehive->getUidAsString()));
        }

        $riser = new Riser(
            $payload->name,
            $beehive,
            $user,
        );

        $this->riserRepository->save($riser);

        return $riser;
    }
}
