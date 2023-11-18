<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Riser;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Riser\CreateRiserTest\fixtures\CreateRiserStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateRiserTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(array $payload): void
    {
        CreateRiserStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('payload'), $this->getInputContent('testCreateRiser'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'new riser' => [[
            'name' => 'new riser',
            'beehive' => CreateRiserStory::ULID_BEEHIVE_USER,
        ]];

        yield 'new riser without beehive' => [[
            'name' => 'new riser',
            'beehive' => null,
        ]];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(array $payload): void
    {
        $this->loginAsUser();

        CreateRiserStory::load();

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateRiser'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [[
            'name' => null,
        ]];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [[
            'name' => $wayTooLongValue,
        ]];
    }

    /**
     * @dataProvider provide testForbidden
     */
    public function testForbidden(array $payload): void
    {
        $this->loginAsUser();

        CreateRiserStory::load();

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateRiser'));

        $this->assertGraphQLForbiddenResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testForbidden(): iterable
    {
        yield 'not owner beehive' => [[
            'name' => 'new name',
            'beehive' => CreateRiserStory::ULID_BEEHIVE,
        ]];
    }
}
