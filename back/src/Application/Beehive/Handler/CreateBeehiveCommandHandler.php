<?php

declare(strict_types=1);

namespace App\Application\Beehive\Handler;

use App\Application\Beehive\Command\CreateBeehiveCommand;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\Repository\BeehiveRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class CreateBeehiveCommandHandler
{
    public function __construct(
        private readonly BeehiveRepositoryInterface $beehiveRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(CreateBeehiveCommand $command): Beehive
    {
        $payload = $command->payload;

        $apiary = $this->apiaryRepository->getOneByUid($payload->apiary);
        if ($apiary->getUser() !== $command->currentUser) {
            throw new ForbiddenException(sprintf('User %s cannot update beehive in this apiary %s', $command->currentUser->getEmail(), $apiary->getUidAsString()));
        }
        $beehive = new Beehive(
            $payload->name,
            $payload->bee,
            $payload->age,
            $apiary,
        );

        $this->beehiveRepository->save($beehive);

        return $beehive;
    }
}
