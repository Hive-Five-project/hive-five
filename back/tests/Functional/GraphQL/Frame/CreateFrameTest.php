<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame;

use App\Domain\Frame\FrameType;
use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CreateFrameTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(array $payload): void
    {
        $this->loginAsUser();
        $this->executeGraphQL(compact('payload'), $this->getInputContent('testCreateFrame'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testValid(): iterable
    {
        yield 'new frame for beehive' => [[
            'label' => 'new frame for beehive',
            'type' => FrameType::Beehive,
        ]];
    }

    /**
     * @dataProvider provide testInvalid
     */
    public function testInvalid(array $payload): void
    {
        $this->loginAsUser();

        $this->executeGraphQL([
            'payload' => $payload,
        ], $this->getInputContent('testCreateFrame'));

        $this->assertGraphQLInvalidPayloadResponse();
        $this->assertJsonResponseMatchesExpectations();
    }

    public function provide testInvalid(): iterable
    {
        yield 'empty fields' => [[
            'label' => null,
            'type' => null,
        ]];

        $o = str_repeat('o', 256);
        $wayTooLongValue = "way-too-lo{$o}ng-value";

        yield 'too long' => [[
            'label' => $wayTooLongValue,
            'type' => FrameType::Beehive,
        ]];
    }
}
