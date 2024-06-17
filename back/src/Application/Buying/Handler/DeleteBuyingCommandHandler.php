<?php

declare(strict_types=1);

namespace App\Application\Buying\Handler;

use App\Application\Buying\Command\DeleteBuyingCommand;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class DeleteBuyingCommandHandler
{
    public function __construct(
        private readonly BuyingRepositoryInterface $buyingRepository,
    ) {
    }

    public function __invoke(DeleteBuyingCommand $command): void
    {
        $buying = $this->buyingRepository->getOneByUid($command->buyingId);
        $user = $command->user;

        if ($buying->getUser() !== $user) {
            throw new ForbiddenException(sprintf('User %s cannot delete buying %s', $user->getEmail(), $buying->getUidAsString()));
        }

        $this->buyingRepository->delete($buying);
    }
}
