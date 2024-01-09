<?php

declare(strict_types=1);

namespace App\Application\Frame\Handler;

use App\Application\Frame\Command\UpdateFrameCommand;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Frame\Frame;
use App\Domain\Frame\Repository\FrameRepositoryInterface;

class UpdateFrameCommandHandler
{
    public function __construct(
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function __invoke(UpdateFrameCommand $command): Frame
    {
        $frame = $this->frameRepository->getOneByUid($command->frameId);
        $payload = $command->payload;
        $user = $command->currentUser;

        if ($frame->getUser() !== $user) {
            throw new ForbiddenException(sprintf('User %s cannot access Frame %s', $user->getEmail(), $frame->getUidAsString()));
        }

        $frame->update(
            $payload->label,
        );

        return $frame;
    }
}
