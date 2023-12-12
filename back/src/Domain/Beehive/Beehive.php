<?php

declare(strict_types=1);

namespace App\Domain\Beehive;

use App\Domain\Apiary\Apiary;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\Riser\Riser;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Beehive
{
    use UlidTrait;
    use TimestampableTrait;

    private string $name;
    private BeeType $bee;
    private int $age;
    private Apiary $apiary;

    /** @var Collection<int, Riser> */
    private Collection $risers;

    public function __construct(
        string $name,
        BeeType $bee,
        int $age,
        Apiary $apiary,
    ) {
        $this->initIdentity();

        $this->name = $name;
        $this->bee = $bee;
        $this->age = $age;
        $this->apiary = $apiary;

        $apiary->addBeehive($this);

        $this->risers = new ArrayCollection();
    }

    public function update(
        string $name,
        BeeType $bee,
        int $age,
        Apiary $apiary,
    ): void {
        $this->name = $name;
        $this->bee = $bee;
        $this->age = $age;

        $this->apiary->deleteBeehive($this);
        $this->apiary = $apiary;
        $apiary->addBeehive($this);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getBee(): BeeType
    {
        return $this->bee;
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function getApiary(): Apiary
    {
        return $this->apiary;
    }

    /**
     * @return Collection<int, Riser>
     */
    public function getRisers(): Collection
    {
        return $this->risers;
    }

    public function addRiser(Riser $riser): void
    {
        $this->risers->add($riser);
    }

    public function deleteRiser(Riser $riser): bool
    {
        return $this->risers->removeElement($riser);
    }
}
