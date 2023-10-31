<?php

declare(strict_types=1);

namespace App\Application\Apiary\Command;

use App\Application\Apiary\Payload\ApiaryPayload;
use App\Domain\User\User;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

readonly class UpdateApiaryCommand
{
    public function __construct(
        public Ulid $apiaryId,
        #[Assert\Valid]
        public ApiaryPayload $payload,
        public User $user,
    ) {
    }
}
