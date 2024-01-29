<?php

declare(strict_types=1);

namespace App\Application\Frame\Command;

use App\Application\Frame\Payload\FramePayload;
use App\Domain\User\User;
use Symfony\Component\Validator\Constraints as Assert;

readonly class CreateFrameCommand
{
    public function __construct(
        #[Assert\Valid]
        public FramePayload $payload,
        public User $currentUser
    ) {
    }
}
