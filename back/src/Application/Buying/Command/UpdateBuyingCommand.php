<?php

declare(strict_types=1);

namespace App\Application\Buying\Command;

use App\Application\Buying\Payload\BuyingPayload;
use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

readonly class UpdateBuyingCommand
{
    public function __construct(
        public Ulid $buyingId,
        #[Assert\Valid]
        public BuyingPayload $payload,
        public User $user,
    ) {
    }
}
