<?php

declare(strict_types=1);

namespace App\Application\Frame\Command;

use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;

readonly class DeleteFrameCommand
{
    public function __construct(
        public Ulid $frameId,
        public User $user,
    ) {
    }
}
