<?php

declare(strict_types=1);

namespace App\Domain\Beehive;

use App\Domain\Apiary\Apiary;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
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
    }

    /**
     * As an admin, update service from the service administration page.
     */
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
}
