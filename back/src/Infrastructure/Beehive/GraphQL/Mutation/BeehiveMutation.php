<?php

declare(strict_types=1);

namespace App\Infrastructure\Beehive\GraphQL\Mutation;

use App\Application\Beehive\Command\CreateBeehiveCommand;
use App\Application\Beehive\Command\UpdateBeehiveCommand;
use App\Application\Beehive\Payload\BeehivePayload;
use App\Domain\Beehive\Beehive;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Uid\Ulid;

class BeehiveMutation extends AbstractMutation implements AliasedInterface
{
    public function __construct(
    ) {
    }

    public function create(Argument $args): Beehive
    {
        $payload = $this->getPayload($args, BeehivePayload::class);

        /** @var Beehive $beehive */
        $beehive = $this->handle(new CreateBeehiveCommand($payload, $this->getDomainUser()));

        return $beehive;
    }

    public function update(Ulid $uid, Argument $args): Beehive
    {
        $payload = $this->getPayload($args, BeehivePayload::class, [
            ObjectNormalizer::OBJECT_TO_POPULATE => new BeehivePayload($uid),
        ]);

        /** @var Beehive $beehive */
        $beehive = $this->handle(new UpdateBeehiveCommand($uid, $payload, $this->getDomainUser()));

        return $beehive;
    }

    // todo : delete beehive. When beehive is deleted, free all frames + risers in it.
    public static function getAliases(): array
    {
        return [
            'create' => 'Beehive.create',
            'update' => 'Beehive.update',
        ];
    }
}
