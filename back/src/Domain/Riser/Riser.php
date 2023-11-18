<?php

declare(strict_types=1);

namespace App\Domain\Riser;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\User\User;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Riser
{
    use UlidTrait;
    use TimestampableTrait;

    private string $name;
    private ?Beehive $beehive = null;
    private User $user;

    public function __construct(
        string $name,
        ?Beehive $beehive,
        User $user,
    ) {
        $this->initIdentity();

        $this->name = $name;
        $this->beehive = $beehive;
        $this->user = $user;

        $beehive?->addRiser($this);
    }

    public function update(
        string $name,
        ?Beehive $beehive,
    ): void {
        $this->name = $name;

        $this->beehive?->deleteRiser($this);
        $this->beehive = $beehive;
        $beehive?->addRiser($this);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getBeehive(): ?Beehive
    {
        return $this->beehive;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
