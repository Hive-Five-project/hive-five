<?php

declare(strict_types=1);

namespace App\Domain\Buying;

use App\Domain\Apiary\Apiary;
use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\User\User;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Buying
{
    use UlidTrait;
    use TimestampableTrait;

    private string $label;
    private float $price;
    private ?\DateTime $date;
    private ?Apiary $apiary;
    private User $user;

    public function __construct(
        string $label,
        float $price,
        ?\DateTime $date,
        ?Apiary $apiary,
        User $user,
    ) {
        $this->initIdentity();

        $this->label = $label;
        $this->price = $price;
        $this->date = $date;
        $this->apiary = $apiary;
        $this->user = $user;
    }

    public function update(
        string $label,
        float $price,
        ?\DateTime $date,
        ?Apiary $apiary,
        User $user
    ): void {
        $this->label = $label;
        $this->price = $price;
        $this->date = $date;
        $this->apiary = $apiary;
        $this->user = $user;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getApiary(): ?Apiary
    {
        return $this->apiary;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }
}
