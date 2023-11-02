<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\Apiary\Apiary;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class User
{
    use UlidTrait;
    use TimestampableTrait;

    private string $email;
    private string $password;

    private string $firstname;
    private string $lastname;

    private bool $admin;

    /** @var Collection<int, Apiary> */
    private Collection $apiaries;

    public function __construct(
        string $email,
        string $password,
        string $firstname,
        string $lastname,
        bool $admin = false,
    ) {
        $this->initIdentity();

        $this->email = $email;
        $this->password = $password;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->admin = $admin;
        $this->apiaries = new ArrayCollection();
    }

    /**
     * As a admin, update a user profile.
     */
    public function update(
        string $email,
        string $firstname,
        string $lastname,
        bool $admin,
    ): void {
        $this->email = $email;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->admin = $admin;
    }

    /**
     * As a user, update his own profile.
     */
    public function updateProfile(
        string $email,
        string $firstname,
        string $lastname,
    ): void {
        $this->email = $email;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
    }

    public function changePassword(string $newPassword): void
    {
        $this->password = $newPassword;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    /**
     * @return Collection<int, Apiary>
     */
    public function getApiaries(): Collection
    {
        return $this->apiaries;
    }

    public function isAdmin(): bool
    {
        return $this->admin;
    }

    public function addApiary(Apiary $apiary): void
    {
        $this->apiaries->add($apiary);
    }
}
