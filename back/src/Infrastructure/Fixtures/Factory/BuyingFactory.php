<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Buying\Buying;
use App\Infrastructure\Buying\Repository\BuyingRepository;
use Zenstruck\Foundry\Instantiator;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Buying>
 *
 * @method        Proxy<Buying>|Buying             create(array|callable $attributes = [])
 * @method static Proxy<Buying>|Buying             createOne(array $attributes = [])
 * @method static Proxy<Buying>|Buying             find(object|array|mixed $criteria)
 * @method static Proxy<Buying>|Buying             findOrCreate(array $attributes)
 * @method static Proxy<Buying>|Buying             first(string $sortedField = 'id')
 * @method static Proxy<Buying>|Buying             last(string $sortedField = 'id')
 * @method static Proxy<Buying>|Buying             random(array $attributes = [])
 * @method static Proxy<Buying>|Buying             randomOrCreate(array $attributes = [])
 * @method static BuyingRepository|RepositoryProxy repository()
 * @method static Buying[]|Proxy<Buying>[]         all()
 * @method static Buying[]|Proxy<Buying>[]         createMany(int $number, array|callable $attributes = [])
 * @method static Buying[]|Proxy<Buying>[]         createSequence(iterable|callable $sequence)
 * @method static Buying[]|Proxy<Buying>[]         findBy(array $attributes)
 * @method static Buying[]|Proxy<Buying>[]         randomRange(int $min, int $max, array $attributes = [])
 * @method static Buying[]|Proxy<Buying>[]         randomSet(int $number, array $attributes = [])
 */
final class BuyingFactory extends ModelFactory
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
            'label' => self::faker()->unique()->word(),
            'price' => self::faker()->randomFloat(2, 10, 1000),
            'date' => self::faker()->dateTime(),
            'apiary' => self::faker()->optional()->randomElement(ApiaryFactory::all()),
            'user' => UserFactory::random(),
        ];
    }

    protected static function getClass(): string
    {
        return Buying::class;
    }
}
