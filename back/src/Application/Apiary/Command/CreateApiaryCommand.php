<?php

declare(strict_types=1);

namespace App\Application\Apiary\Command;

use App\Application\Apiary\Payload\ApiaryPayload;
use App\Domain\User\User;
use Symfony\Component\Validator\Constraints as Assert;

readonly class CreateApiaryCommand
{
    public function __construct(
        #[Assert\Valid]
        public ApiaryPayload $payload,
        public User $user
    ) {
    }
}
