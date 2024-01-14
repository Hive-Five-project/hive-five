<?php

declare(strict_types=1);

namespace App\Domain\Buying;

use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\Apiary\Apiary;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Buying
{
    use UlidTrait;
    use TimestampableTrait;

    private string $label;
    private float $price;
    private Apiary $apiary;


    public function __construct(
        string $label,
        float $price,
        Apiary $apiary,
    ) {
        $this->initIdentity();

        $this->label = $label;
        $this->price = $price;
        $this->apiary = $apiary;

    }

    public function update(
        string $label,
        float $price,
        Apiary $apiary,
    ): void {
        $this->label = $label;
        $this->price = $price;
        $this->apiary = $apiary;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getApiary(): Apiary
    {
        return $this->apiary;
    }

}
