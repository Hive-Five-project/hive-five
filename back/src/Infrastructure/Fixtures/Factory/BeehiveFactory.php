<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Beehive\Beehive;
use App\Domain\Beehive\BeeType;
use App\Infrastructure\Beehive\Repository\BeehiveRepository;
use Zenstruck\Foundry\Instantiator;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Beehive>
 *
 * @method        Proxy<Beehive>|Beehive            create(array|callable $attributes = [])
 * @method static Proxy<Beehive>|Beehive            createOne(array $attributes = [])
 * @method static Proxy<Beehive>|Beehive            find(object|array|mixed $criteria)
 * @method static Proxy<Beehive>|Beehive            findOrCreate(array $attributes)
 * @method static Proxy<Beehive>|Beehive            first(string $sortedField = 'id')
 * @method static Proxy<Beehive>|Beehive            last(string $sortedField = 'id')
 * @method static Proxy<Beehive>|Beehive            random(array $attributes = [])
 * @method static Proxy<Beehive>|Beehive            randomOrCreate(array $attributes = [])
 * @method static BeehiveRepository|RepositoryProxy repository()
 * @method static Beehive[]|Proxy<Beehive>[]        all()
 * @method static Beehive[]|Proxy<Beehive>[]        createMany(int $number, array|callable $attributes = [])
 * @method static Beehive[]|Proxy<Beehive>[]        createSequence(iterable|callable $sequence)
 * @method static Beehive[]|Proxy<Beehive>[]        findBy(array $attributes)
 * @method static Beehive[]|Proxy<Beehive>[]        randomRange(int $min, int $max, array $attributes = [])
 * @method static Beehive[]|Proxy<Beehive>[]        randomSet(int $number, array $attributes = [])
 */
final class BeehiveFactory extends ModelFactory
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
            'bee' => self::faker()->randomElement(BeeType::cases()),
            'age' => self::faker()->randomNumber(),
            'apiary' => ApiaryFactory::random(),
        ];
    }

    protected static function getClass(): string
    {
        return Beehive::class;
    }
}
