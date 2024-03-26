<?php

declare(strict_types=1);

namespace App\Application\User\Handler;

use App\Application\User\Command\DeleteUserCommand;
use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Common\Exception\NotFoundException;
use App\Domain\User\Repository\UserRepositoryInterface;
use Symfony\Component\Uid\Ulid;

class DeleteUserCommandHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository
    ) {
    }

    /**
     * @throws NotFoundException When user is not found
     */
    public function __invoke(DeleteUserCommand $command): Ulid
    {
        $user = $this->userRepository->getOneByUid($command->userUid);
        if (null !== $user->getDeletedAt()) {
            throw new ForbiddenException(sprintf('User %s is already deleted', $user->getEmail()));
        }
        $this->userRepository->delete($user);

        return $user->getUid();
    }
}
