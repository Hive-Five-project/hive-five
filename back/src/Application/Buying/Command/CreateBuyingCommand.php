<?php

declare(strict_types=1);

namespace App\Application\Buying\Command;

use App\Application\Buying\Payload\BuyingPayload;
use App\Domain\User\User;
use Symfony\Component\Validator\Constraints as Assert;

readonly class CreateBuyingCommand
{
    public function __construct(
        #[Assert\Valid]
        public BuyingPayload $payload,
        public User $user
    ) {
    }
}
