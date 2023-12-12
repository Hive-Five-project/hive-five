<?php

declare(strict_types=1);

namespace App\Application\Apiary\Handler;

use App\Application\Apiary\Command\UpdateApiaryCommand;
use App\Domain\Apiary\Apiary;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class UpdateApiaryCommandHandler
{
    public function __construct(
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(UpdateApiaryCommand $command): Apiary
    {
        $apiary = $this->apiaryRepository->getOneByUid($command->apiaryId);
        $payload = $command->payload;
        $user = $command->user;

        if ($apiary->getUser() !== $user) {
            throw new ForbiddenException(sprintf('User %s cannot access apiary %s', $user->getEmail(), $apiary->getUidAsString()));
        }

        $apiary->update(
            $payload->name,
            $payload->address,
            $user,
        );

        return $apiary;
    }
}
