<?php

declare(strict_types=1);

namespace App\Application\Beehive\Handler;

use App\Application\Beehive\Command\UpdateBeehiveCommand;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class UpdateBeehiveCommandHandler
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
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

        $beehive->update(
            $payload->name,
            $payload->bee,
            $payload->age,
            $apiary,
        );

        return $beehive;
    }
}
