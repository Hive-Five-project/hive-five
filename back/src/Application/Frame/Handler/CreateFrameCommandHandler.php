<?php

declare(strict_types=1);

namespace App\Application\Frame\Handler;

use App\Application\Frame\Command\CreateFrameCommand;
use App\Domain\Frame\Frame;
use App\Domain\Frame\Repository\FrameRepositoryInterface;

class CreateFrameCommandHandler
{
    public function __construct(
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function __invoke(CreateFrameCommand $command): Frame
    {
        $payload = $command->payload;
        $user = $command->currentUser;

        $frame = new Frame(
            $payload->label,
            $payload->type,
            $user,
        );

        $this->frameRepository->save($frame);

        return $frame;
    }
}
