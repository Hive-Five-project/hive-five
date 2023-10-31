<?php

declare(strict_types=1);

namespace App\Application\Apiary\Handler;

use App\Application\Apiary\Command\UpdateApiaryCommand;
use App\Domain\User\Repository\UserRepositoryInterface;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Apiary\Apiary;

class UpdateApiaryCommandHandler
{
    public function __construct(
        private readonly ApiaryRepositoryInterface $apiaryRepository,
        private readonly UserRepositoryInterface $userRepository,
    ) {
    }

    public function __invoke(UpdateApiaryCommand $command): Apiary
    {
        $apiary = $this->apiaryRepository->getOneByUid($command->apiaryId);
        $payload = $command->payload;

        $user = $this->userRepository->getOneByUid($payload->user);

        $apiary->update(
            $payload->name,
            $payload->address,
            $user,
        );

        return $apiary;
    }
}
