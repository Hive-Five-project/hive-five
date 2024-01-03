<?php

declare(strict_types=1);

namespace App\Infrastructure\Frame\GraphQL\Query;

use App\Domain\Common\Exception\ForbiddenException;
use App\Domain\Frame\Frame;
use App\Domain\Frame\Repository\FrameRepositoryInterface;
use App\Infrastructure\Bridge\GraphQL\Resolver\AbstractResolver;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class FrameResolver extends AbstractResolver implements AliasedInterface
{
    public function __construct(
        private readonly FrameRepositoryInterface $frameRepository,
    ) {
    }

    public function find(Ulid $uid): Frame
    {
        return $this->withGraphQLErrorHandler(
            function () use ($uid) {
                $frame = $this->frameRepository->getOneByUid($uid);
                if ($frame->getUser() !== $this->getDomainUser()) {
                    throw new ForbiddenException(
                        sprintf(
                            'User %s cannot access frame with %s',
                            $this->getDomainUser()->getEmail(),
                            $frame->getUidAsString()
                        )
                    );
                }

                return $frame;
            }
        );
    }

    public function listFrameType(): array
    {
        return $this->frameRepository->listFrameTypes();
    }

    public static function getAliases(): array
    {
        return [
            'find' => 'Frame.find',
            'listFrameType' => 'Frame.listFrameType',
        ];
    }
}
