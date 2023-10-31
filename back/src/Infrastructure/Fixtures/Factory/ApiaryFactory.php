<?php

declare(strict_types=1);

namespace App\Infrastructure\Fixtures\Factory;

use App\Domain\Apiary\Apiary;
use App\Infrastructure\Apiary\Repository\ApiaryRepository;
use Symfony\Component\Uid\Ulid;
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
    public const ULID_APIARY = '01H5KQW6EBYNGSWRE09ANVREXX';
    public const ULID_APIARY_2 = '01H82DFYZMANTX4N4FES76RDF0';
    public const ULID_APIARY_ADMIN = '01HE39KXBWVS6N93ZB9WEXJ3RF';
    public const ULID_APIARY_ADMIN_2 = '01HE39M6CXC360KVZ6R08MP669';

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

    public static function baseApiary(): void
    {
        self::new()->create([
            'uid' => new Ulid(self::ULID_APIARY),
            'name' => 'Custom apiary',
            'address' => self::faker()->address(),
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ]);

        self::new()->create([
            'uid' => new Ulid(self::ULID_APIARY_2),
            'name' => 'Custom apiary 2',
            'address' => self::faker()->address(),
            'user' => UserFactory::find(['uid' => UserFactory::ULID_USER]),
        ]);

        self::new()->create([
            'uid' => new Ulid(self::ULID_APIARY_ADMIN),
            'name' => 'Custom apiary 2',
            'adress' => self::faker()->address(),
            'category' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ]);

        self::new()->create([
            'uid' => new Ulid(self::ULID_APIARY_ADMIN_2),
            'name' => 'Custom apiary 2',
            'adress' => self::faker()->address(),
            'category' => UserFactory::find(['uid' => UserFactory::ULID_ADMIN]),
        ]);
    }
}
