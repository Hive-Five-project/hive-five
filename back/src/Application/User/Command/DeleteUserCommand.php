<?php

declare(strict_types=1);

namespace App\Application\User\Command;

use Symfony\Component\Uid\Ulid;

readonly class DeleteUserCommand
{
    public function __construct(
        public Ulid $userUid,
    ) {
    }
}
