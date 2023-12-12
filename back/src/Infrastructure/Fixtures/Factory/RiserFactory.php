<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Riser\Riser;
use App\Infrastructure\Riser\Repository\RiserRepository;
use Zenstruck\Foundry\Instantiator;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

use function Zenstruck\Foundry\repository;

use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Riser>
 *
 * @method        Proxy<Riser>|Riser              create(array|callable $attributes = [])
 * @method static Proxy<Riser>|Riser              createOne(array $attributes = [])
 * @method static Proxy<Riser>|Riser              find(object|array|mixed $criteria)
 * @method static Proxy<Riser>|Riser              findOrCreate(array $attributes)
 * @method static Proxy<Riser>|Riser              first(string $sortedField = 'id')
 * @method static Proxy<Riser>|Riser              last(string $sortedField = 'id')
 * @method static Proxy<Riser>|Riser              random(array $attributes = [])
 * @method static Proxy<Riser>|Riser              randomOrCreate(array $attributes = [])
 * @method static RiserRepository|RepositoryProxy repository()
 * @method static Riser[]|Proxy<Riser>[]          all()
 * @method static Riser[]|Proxy<Riser>[]          createMany(int $number, array|callable $attributes = [])
 * @method static Riser[]|Proxy<Riser>[]          createSequence(iterable|callable $sequence)
 * @method static Riser[]|Proxy<Riser>[]          findBy(array $attributes)
 * @method static Riser[]|Proxy<Riser>[]          randomRange(int $min, int $max, array $attributes = [])
 * @method static Riser[]|Proxy<Riser>[]          randomSet(int $number, array $attributes = [])
 */
final class RiserFactory extends ModelFactory
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
            'name' => self::faker()->unique()->name(),
            'beehive' => self::faker()->optional()->randomElement(BeehiveFactory::all()),
            'user' => UserFactory::random(),
        ];
    }

    protected static function getClass(): string
    {
        return Riser::class;
    }
}
