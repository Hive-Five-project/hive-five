<?php

declare(strict_types=1);

namespace App\Application\Apiary\Handler;

use App\Application\Apiary\Command\DeleteApiaryCommand;
use App\Domain\Apiary\Apiary;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class DeleteApiaryCommandHandler
{
    public function __construct(
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(DeleteApiaryCommand $command): Apiary
    {
        $apiary = $this->apiaryRepository->getOneByUid($command->apiaryId);
        $user = $command->user;

        if ($apiary->getUser() !== $user) {
            throw new ForbiddenException(sprintf('User %s cannot delete apiary %s', $user->getEmail(), $apiary->getUidAsString()));
        }
        if ($apiary->getBeehives()->count() > 0) {
            throw new ForbiddenException(sprintf('Apiary %s has hives, cannot delete', $apiary->getUidAsString()));
        }

        $apiary->delete();
        $this->apiaryRepository->delete($apiary);

        return $apiary;
    }
}
