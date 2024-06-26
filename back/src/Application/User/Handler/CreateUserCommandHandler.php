<?php

declare(strict_types=1);

namespace App\Application\User\Handler;

use App\Application\User\Command\CreateUserCommand;
use App\Domain\User\Repository\UserRepositoryInterface;
use App\Domain\User\Security\PasswordHasherInterface;
use App\Domain\User\User;

class CreateUserCommandHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly PasswordHasherInterface $passwordHasher
    ) {
    }

    public function __invoke(CreateUserCommand $command): User
    {
        $payload = $command->payload;

        $user = new User(
            $payload->email,
            $this->passwordHasher->hash($payload->password ?? self::basePassword()),
            $payload->firstname,
            $payload->lastname,
            $payload->isAdmin,
        );

        $this->userRepository->save($user);

        return $user;
    }

    private static function basePassword(): string
    {
        return md5('password');
    }
}
