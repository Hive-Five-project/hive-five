<?php

declare(strict_types=1);

namespace App\Infrastructure\Apiary\GraphQL\Mutation;

use App\Application\Apiary\Command\CreateApiaryCommand;
use App\Application\Apiary\Command\UpdateApiaryCommand;
use App\Application\Apiary\Payload\ApiaryPayload;
use App\Domain\Apiary\Apiary;
use App\Infrastructure\Bridge\GraphQL\Mutation\AbstractMutation;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Uid\Ulid;

class ApiaryMutation extends AbstractMutation implements AliasedInterface
{
    public function create(Argument $args): Apiary
    {
        $payload = $this->getPayload($args, ApiaryPayload::class);

        /** @var Apiary $apiary */
        $apiary = $this->handle(new CreateApiaryCommand($payload, $this->getDomainUser()));

        return $apiary;
    }

    public function update(Ulid $uid, Argument $args): Apiary
    {
        $payload = $this->getPayload($args, ApiaryPayload::class, [
            ObjectNormalizer::OBJECT_TO_POPULATE => new ApiaryPayload($uid),
        ]);

        $currentUser = $this->getDomainUser();

        /** @var Apiary $apiary */
        $apiary = $this->handle(new UpdateApiaryCommand($uid, $payload, $currentUser));

        return $apiary;
    }

    public function delete(Ulid $uid): Ulid
    {
        $currentUser = $this->getDomainUser();

        /** @var Apiary $deletedApiary */
        $deletedApiary = $this->handle(new DeleteApiaryCommand($uid, $currentUser));

        return $deletedApiary->getUid();
    }

    public static function getAliases(): array
    {
        return [
            'create' => 'Apiary.create',
            'update' => 'Apiary.update',
            'delete' => 'Apiary.delete',
        ];
    }
}
