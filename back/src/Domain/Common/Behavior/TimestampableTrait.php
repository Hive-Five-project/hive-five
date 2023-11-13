<?php

declare(strict_types=1);

namespace App\Domain\Common\Behavior;

/**
 * @see TimestampableInterface
 */
trait TimestampableTrait
{
    private \DateTime $createdAt;
    private \DateTime $updatedAt;
    private ?\DateTime $deletedAt = null;

    public function setCreatedAt(\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getUpdatedAt(): \DateTime
    {
        return $this->updatedAt;
    }

    public function setDeletedAt(\DateTime $deletedAt): void
    {
        $this->deletedAt = $deletedAt;
    }

    public function getDeletedAt(): ?\DateTime
    {
        return $this->deletedAt;
    }

    public function isDeleted(): bool
    {
        return null !== $this->deletedAt;
    }

    public function delete(\DateTime $deletedAt = new \DateTime('now')): void
    {
        $this->deletedAt = $deletedAt;
    }

    public function undelete(): void
    {
        $this->deletedAt = null;
    }

    /**
     * @interal Unit tests only, where Doctrine does not populate this field.
     */
    public function initCreated(\DateTime $at = null): void
    {
        $this->createdAt = $at ?? new \DateTime();
    }

    public function markAsUpdated(\DateTime $at = null): void
    {
        $this->updatedAt = $at ?? new \DateTime();
    }
}
