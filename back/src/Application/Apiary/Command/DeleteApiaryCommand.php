<?php

declare(strict_types=1);

namespace App\Application\Apiary\Command;

use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;

readonly class DeleteApiaryCommand
{
    public function __construct(
        public Ulid $apiaryId,
        public User $user,
    ) {
    }
}
