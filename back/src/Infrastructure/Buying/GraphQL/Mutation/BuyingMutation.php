<?php

declare(strict_types=1);

namespace App\Infrastructure\Buying\GraphQL\Mutation;

use App\Application\Buying\Command\CreateBuyingCommand;
use App\Application\Buying\Command\DeleteBuyingCommand;
use App\Application\Buying\Payload\BuyingPayload;
use App\Domain\Buying\Buying;
use App\Domain\Buying\Repository\BuyingRepositoryInterface;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Uid\Ulid;

class BuyingMutation extends AbstractMutation implements AliasedInterface
{
    public function __construct(
        private readonly BuyingRepositoryInterface $buyingRepository,
    ) {
    }

    public function create(Argument $args): Buying
    {
        $payload = $this->getPayload($args, BuyingPayload::class);

        /** @var Buying $buying */
        $buying = $this->handle(new CreateBuyingCommand($payload, $this->getDomainUser()));

        return $buying;
    }

    public function delete(Ulid $uid): Ulid
    {
        $currentUser = $this->getDomainUser();

        $buying = $this->buyingRepository->getOneByUid($uid);

        $buyingUid = $buying->getUid();

        $this->handle(new DeleteBuyingCommand($uid, $currentUser));

        return $buyingUid;
    }

    public static function getAliases(): array
    {
        return [
            'create' => 'Buying.create',
            'delete' => 'Buying.delete',
        ];
    }
}
