<?php

declare(strict_types=1);

namespace App\Infrastructure\Frame\GraphQL\Mutation;

use App\Application\Frame\Command\CreateFrameCommand;
use App\Application\Frame\Command\DeleteFrameCommand;
use App\Application\Frame\Command\UpdateFrameCommand;
use App\Application\Frame\Payload\FramePayload;
use App\Domain\Frame\Frame;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Uid\Ulid;

class FrameMutation extends AbstractMutation implements AliasedInterface
{
    public function create(Argument $args): Frame
    {
        $payload = $this->getPayload($args, FramePayload::class);

        /** @var Frame $frame */
        $frame = $this->handle(new CreateFrameCommand($payload, $this->getDomainUser()));

        return $frame;
    }

    public function update(Ulid $uid, Argument $args): Frame
    {
        $payload = $this->getPayload($args, FramePayload::class, [
            ObjectNormalizer::OBJECT_TO_POPULATE => new FramePayload($uid),
        ]);

        $currentUser = $this->getDomainUser();

        /** @var Frame $frame */
        $frame = $this->handle(new UpdateFrameCommand($uid, $payload, $currentUser));

        return $frame;
    }

    public function delete(Ulid $uid): Ulid
    {
        $currentUser = $this->getDomainUser();

        /** @var Frame $deletedFrame */
        $deletedFrame = $this->handle(new DeleteFrameCommand($uid, $currentUser));

        return $deletedFrame->getUid();
    }

    public static function getAliases(): array
    {
        return [
            'create' => 'Frame.create',
            'update' => 'Frame.update',
            'delete' => 'Frame.delete',
        ];
    }
}
