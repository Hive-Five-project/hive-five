<?php

declare(strict_types=1);

namespace App\Domain\Frame;

use App\Domain\Common\Behavior\TimestampableTrait;
use App\Domain\Common\Behavior\UlidTrait;
use App\Domain\User\User;
use Symfony\Component\DependencyInjection\Attribute\Exclude;

#[Exclude]
class Frame
{
    use UlidTrait;
    use TimestampableTrait;

    private string $label;
    private FrameType $type;
    private User $user;

    public function __construct(
        string $label,
        FrameType $type,
        User $user,
    ) {
        $this->initIdentity();

        $this->label = $label;
        $this->type = $type;
        $this->user = $user;
    }

    public function update(
        string $label,
    ): void {
        $this->label = $label;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getType(): FrameType
    {
        return $this->type;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
