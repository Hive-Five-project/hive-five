<?php

declare(strict_types=1);

namespace App\Application\Frame\Handler;

use App\Application\Frame\Command\DeleteFrameCommand;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Frame\Frame;
use App\Domain\Frame\Repository\FrameRepositoryInterface;

class DeleteFrameCommandHandler
{
    public function __construct(
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function __invoke(DeleteFrameCommand $command): Frame
    {
        $frame = $this->frameRepository->getOneByUid($command->frameId);
        $user = $command->user;

        if ($frame->getUser() !== $user) {
            throw new ForbiddenException(
                sprintf('User %s cannot delete frame %s', $user->getEmail(), $frame->getUidAsString())
            );
        }

        $this->frameRepository->delete($frame); // hard delete

        return $frame;
    }
}
