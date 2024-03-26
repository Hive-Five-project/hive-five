<?php

declare(strict_types=1);

namespace App\Application\Buying\Handler;

use App\Application\Buying\Command\UpdateBuyingCommand;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Buying\Buying;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;
use App\Domain\Common\Exception\ForbiddenException;

class UpdateBuyingCommandHandler
{
    public function __construct(
        private readonly BuyingRepositoryInterface $buyingRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(UpdateBuyingCommand $command): Buying
    {
        $buying = $this->buyingRepository->getOneByUid($command->buyingId);
        $payload = $command->payload;
        $user = $command->user;
        $apiary = $this->apiaryRepository->getOneByUid($payload->apiary);

        // Vérifie si l'utilisateur actuel est autorisé à mettre à jour cet achat
        if ($buying->getUser() !== $user) {
            throw new ForbiddenException(sprintf('User %s cannot update buying %s', $user->getEmail(), $buying->getUid()->toRfc4122()));
        }

        $buying->update(
            $payload->label,
            $payload->price,
            $payload->date,
            $apiary,
            $user,
        );

        $this->buyingRepository->save($buying);

        return $buying;
    }
}
