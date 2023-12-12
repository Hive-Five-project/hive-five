<?php

declare(strict_types=1);

namespace App\Application\Riser\Command;

use App\Application\Riser\Payload\RiserPayload;
use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

readonly class UpdateRiserCommand
{
    public function __construct(
        public Ulid $riserUid,
        #[Assert\Valid]
        public RiserPayload $payload,
        public User $currentUser,
    ) {
    }
}
