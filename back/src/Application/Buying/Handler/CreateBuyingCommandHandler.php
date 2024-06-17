<?php

declare(strict_types=1);

namespace App\Application\Buying\Handler;

use App\Application\Buying\Command\CreateBuyingCommand;
use App\Domain\Apiary\Repository\ApiaryRepositoryInterface;
use App\Domain\Buying\Buying;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;

class CreateBuyingCommandHandler
{
    public function __construct(
        private readonly BuyingRepositoryInterface $buyingRepository,
        private readonly ApiaryRepositoryInterface $apiaryRepository,
    ) {
    }

    public function __invoke(CreateBuyingCommand $command): Buying
    {
        $payload = $command->payload;
        $user = $command->user;

        $apiary = null;

        if ($payload->apiary !== null) {
            $apiary = $this->apiaryRepository->getOneByUid($payload->apiary);
        }

        $buying = new Buying(
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
