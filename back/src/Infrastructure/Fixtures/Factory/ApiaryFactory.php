<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Apiary\Apiary;
use App\Infrastructure\Apiary\Repository\ApiaryRepository;
use Zenstruck\Foundry\Instantiator;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Apiary>
 *
 * @method        Proxy<Apiary>|Apiary             create(array|callable $attributes = [])
 * @method static Proxy<Apiary>|Apiary             createOne(array $attributes = [])
 * @method static Proxy<Apiary>|Apiary             find(object|array|mixed $criteria)
 * @method static Proxy<Apiary>|Apiary             findOrCreate(array $attributes)
 * @method static Proxy<Apiary>|Apiary             first(string $sortedField = 'id')
 * @method static Proxy<Apiary>|Apiary             last(string $sortedField = 'id')
 * @method static Proxy<Apiary>|Apiary             random(array $attributes = [])
 * @method static Proxy<Apiary>|Apiary             randomOrCreate(array $attributes = [])
 * @method static ApiaryRepository|RepositoryProxy repository()
 * @method static Apiary[]|Proxy<Apiary>[]         all()
 * @method static Apiary[]|Proxy<Apiary>[]         createMany(int $number, array|callable $attributes = [])
 * @method static Apiary[]|Proxy<Apiary>[]         createSequence(iterable|callable $sequence)
 * @method static Apiary[]|Proxy<Apiary>[]         findBy(array $attributes)
 * @method static Apiary[]|Proxy<Apiary>[]         randomRange(int $min, int $max, array $attributes = [])
 * @method static Apiary[]|Proxy<Apiary>[]         randomSet(int $number, array $attributes = [])
 */
final class ApiaryFactory extends ModelFactory
{
    protected function initialize(): static
    {
        // Allow to set the status when creating an import fixture, even without the setter
        return parent::initialize()->instantiateWith(
            (new Instantiator())->alwaysForceProperties(['uid']),
        );
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->unique()->domainName(),
            'address' => self::faker()->address(),
            'user' => UserFactory::random(),
        ];
    }

    protected static function getClass(): string
    {
        return Apiary::class;
    }
}
