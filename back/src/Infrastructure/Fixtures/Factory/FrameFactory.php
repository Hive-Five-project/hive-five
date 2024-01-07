<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Frame\Frame;
use App\Domain\Frame\FrameType;
use App\Infrastructure\Frame\Repository\FrameRepository;
use Zenstruck\Foundry\Instantiator;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Frame>
 *
 * @method        Proxy<Frame>|Frame              create(array|callable $attributes = [])
 * @method static Proxy<Frame>|Frame              createOne(array $attributes = [])
 * @method static Proxy<Frame>|Frame              find(object|array|mixed $criteria)
 * @method static Proxy<Frame>|Frame              findOrCreate(array $attributes)
 * @method static Proxy<Frame>|Frame              first(string $sortedField = 'id')
 * @method static Proxy<Frame>|Frame              last(string $sortedField = 'id')
 * @method static Proxy<Frame>|Frame              random(array $attributes = [])
 * @method static Proxy<Frame>|Frame              randomOrCreate(array $attributes = [])
 * @method static FrameRepository|RepositoryProxy repository()
 * @method static Frame[]|Proxy<Frame>[]          all()
 * @method static Frame[]|Proxy<Frame>[]          createMany(int $number, array|callable $attributes = [])
 * @method static Frame[]|Proxy<Frame>[]          createSequence(iterable|callable $sequence)
 * @method static Frame[]|Proxy<Frame>[]          findBy(array $attributes)
 * @method static Frame[]|Proxy<Frame>[]          randomRange(int $min, int $max, array $attributes = [])
 * @method static Frame[]|Proxy<Frame>[]          randomSet(int $number, array $attributes = [])
 */
final class FrameFactory extends ModelFactory
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
            'label' => self::faker()->unique()->name(),
            'type' => self::faker()->randomElement(FrameType::cases()),
            'user' => UserFactory::random(),
        ];
    }

    protected static function getClass(): string
    {
        return Frame::class;
    }
}
