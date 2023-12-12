<?php

declare(strict_types=1);

namespace App\Domain\Apiary;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Apiary
{
    use UlidTrait;
    use TimestampableTrait;

    private string $name;
    private string $address;
    private User $user;

    /** @var Collection<int, Beehive> */
    private Collection $beehives;

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

        $this->beehives = new ArrayCollection();
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
        $this->user->deleteApiary($this);
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

    /**
     * @return Collection<int, Beehive>
     */
    public function getBeehives(): Collection
    {
        return $this->beehives;
    }

    public function addBeehive(Beehive $beehive): void
    {
        $this->beehives->add($beehive);
    }

    public function deleteBeehive(Beehive $beehive): bool
    {
        return $this->beehives->removeElement($beehive);
    }
}
