<?php

declare(strict_types=1);

namespace App\Infrastructure\Riser\GraphQL\Mutation;

use App\Application\Riser\Command\CreateRiserCommand;
use App\Application\Riser\Command\UpdateRiserCommand;
use App\Application\Riser\Payload\RiserPayload;
use App\Domain\Riser\Riser;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Uid\Ulid;

class RiserMutation extends AbstractMutation implements AliasedInterface
{
    public function __construct(
    ) {
    }

    public function create(Argument $args): Riser
    {
        $payload = $this->getPayload($args, RiserPayload::class);

        /** @var Riser $riser */
        $riser = $this->handle(new CreateRiserCommand($payload, $this->getDomainUser()));

        return $riser;
    }

    public function update(Ulid $uid, Argument $args): Riser
    {
        $payload = $this->getPayload($args, RiserPayload::class, [
            ObjectNormalizer::OBJECT_TO_POPULATE => new RiserPayload($uid),
        ]);

        /** @var Riser $riser */
        $riser = $this->handle(new UpdateRiserCommand($uid, $payload, $this->getDomainUser()));

        return $riser;
    }

    public static function getAliases(): array
    {
        return [
            'create' => 'Riser.create',
            'update' => 'Riser.update',
        ];
    }
}
