<?php

declare(strict_types=1);

namespace App\Domain\Riser;

use App\Domain\Beehive\Beehive;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\Frame\Frame;
use App\Domain\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Riser
{
    use UlidTrait;
    use TimestampableTrait;

    private string $name;
    private ?Beehive $beehive = null;
    private User $user;

    /** @var Collection<int, Frame> */
    private Collection $frames;

    public function __construct(
        string $name,
        ?Beehive $beehive,
        User $user,
    ) {
        $this->initIdentity();

        $this->name = $name;
        $this->beehive = $beehive;
        $this->user = $user;
        $this->frames = new ArrayCollection();

        $beehive?->addRiser($this);
    }

    public function update(
        string $name,
        ?Beehive $beehive,
        array $frames,
    ): void {
        $this->name = $name;

        $this->beehive?->deleteRiser($this);
        $this->beehive = $beehive;
        $beehive?->addRiser($this);
        $this->frames = new ArrayCollection($frames);
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

    /**
     * @return Collection<int, Frame>
     */
    public function getFrames(): Collection
    {
        return $this->frames;
    }

    public function addFrame(Frame $frame): void
    {
        if ($this->frames->contains($frame)) {
            return;
        }
        $this->frames->add($frame);
    }

    public function deleteFrame(Frame $frame): bool
    {
        return $this->frames->removeElement($frame);
    }
}
