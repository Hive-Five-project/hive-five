<?php

declare(strict_types=1);

namespace App\Application\Beehive\Command;

use App\Application\Beehive\Payload\BeehivePayload;
use App\Domain\User\User;
use Symfony\Component\Validator\Constraints as Assert;

readonly class CreateBeehiveCommand
{
    public function __construct(
        #[Assert\Valid]
        public BeehivePayload $payload,
        public User $currentUser
    ) {
    }
}
