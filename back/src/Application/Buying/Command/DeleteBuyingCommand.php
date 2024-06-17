<?php

declare(strict_types=1);

namespace App\Application\Buying\Command;

use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;

readonly class DeleteBuyingCommand
{
    public function __construct(
        public Ulid $buyingId,
        public User $user,
    ) {
    }
}
