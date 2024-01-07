<?php

declare(strict_types=1);

namespace App\Infrastructure\Security\User;

use App\Domain\User\Security\PasswordHasherInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\PasswordHasherInterface as SymfonyPasswordHasher;

class PasswordHasher implements PasswordHasherInterface
{
    public function __construct(
        #[Autowire(service: 'identity_password_hasher')]
        private readonly SymfonyPasswordHasher $passwordHasher
    ) {
    }

    public function hash(#[\SensitiveParameter] string $plainPassword): string
    {
        return $this->passwordHasher->hash($plainPassword);
    }
}
