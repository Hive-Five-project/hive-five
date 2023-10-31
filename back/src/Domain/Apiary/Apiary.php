<?php

declare(strict_types=1);

namespace App\Domain\Apiary;

use App\Domain\User\User;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Apiary
{
    use UlidTrait;
    use TimestampableTrait;

    private string $name;
    private string $address;
    private User $user;

    public function __construct(
        string $name,
        string $address,
        User $user,
    ) {
        $this->initIdentity();
        $this->name = $name;
        $this->address = $address;
        $this->user = $user;
        $user->addApiary($this);
    }

    /**
     * As an admin, update service from the service administration page.
     */
    public function update(
        string $name,
        string $address,
        User $user,
    ): void {
        $this->name = $name;
        $this->address = $address;
        $this->user->getApiaries()->removeElement($this);
        $this->user = $user;
        $user->addApiary($this);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
