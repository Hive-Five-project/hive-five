<?php

declare(strict_types=1);

namespace App\Infrastructure\Buying\GraphQL\Mutation;

use App\Application\Buying\Command\CreateBuyingCommand;
use App\Application\Buying\Command\DeleteBuyingCommand;
use App\Application\Buying\Command\UpdateBuyingCommand;
use App\Application\Buying\Payload\BuyingPayload;
use App\Domain\Buying\Buying;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Uid\Ulid;

class BuyingMutation extends AbstractMutation implements AliasedInterface
{
    public function create(Argument $args): Buying
    {
        $payload = $this->getPayload($args, BuyingPayload::class);

        /** @var Buying $buying */
        $buying = $this->handle(new CreateBuyingCommand($payload, $this->getDomainUser()));

        return $buying;
    }

    public function update(Ulid $uid, Argument $args): Buying
    {
        $payload = $this->getPayload($args, BuyingPayload::class, [
            ObjectNormalizer::OBJECT_TO_POPULATE => new BuyingPayload($uid),
        ]);

        $currentUser = $this->getDomainUser();

        /** @var Buying $buying */
        $buying = $this->handle(new UpdateBuyingCommand($uid, $payload, $currentUser));

        return $buying;
    }

    public function delete(Ulid $uid): Ulid
    {
        $currentUser = $this->getDomainUser();

        /** @var Buying $deletedBuying */
        $deletedBuying = $this->handle(new DeleteBuyingCommand($uid, $currentUser));

        return $deletedBuying->getUid();
    }

    public static function getAliases(): array
    {
        return [
            'create' => 'Buying.create',
            'update' => 'Buying.update',
            'delete' => 'Buying.delete',
        ];
    }
}
