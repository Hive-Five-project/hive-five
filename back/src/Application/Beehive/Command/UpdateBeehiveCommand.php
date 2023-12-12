<?php

declare(strict_types=1);

namespace App\Application\Beehive\Command;

use App\Application\Beehive\Payload\BeehivePayload;
use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

readonly class UpdateBeehiveCommand
{
    public function __construct(
        public Ulid $beehiveUid,
        #[Assert\Valid]
        public BeehivePayload $payload,
        public User $currentUser,
    ) {
    }
}
