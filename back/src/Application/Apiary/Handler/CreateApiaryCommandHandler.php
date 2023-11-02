<?php

declare(strict_types=1);

namespace App\Application\Apiary\Handler;

use App\Application\Apiary\Command\CreateApiaryCommand;
use App\Domain\User\Repository\UserRepositoryInterface;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Apiary\Apiary;
use App\Domain\User\User;

class CreateApiaryCommandHandler
{
    public function __construct(
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(CreateApiaryCommand $command): Apiary
    {
        $payload = $command->payload;
        $user = $command->user;

        $apiary = new Apiary(
            $payload->name,
            $payload->address,
            $user,
        );

        $this->apiaryRepository->save($apiary);

        return $apiary;
    }
}
