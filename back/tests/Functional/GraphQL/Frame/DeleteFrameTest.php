<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Frame\DeleteFrameTest\fixtures\DeleteFrameStory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class DeleteFrameTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValid
     */
    public function testValid(string $uid): void
    {
        DeleteFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteFrame'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();

        // todo : assert if frame is set to null in hive or riser after added to them and deleted.
    }

    public function provide testValid(): iterable
    {
        yield 'delete Frame' => [
            DeleteFrameStory::ULID_FRAME,
        ];
    }

    /**
     * @dataProvider provide testInvalidNotOwner
     */
    public function testInvalidNotOwner(string $uid): void
    {
        DeleteFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(compact('uid'), $this->getInputContent('testDeleteFrame'));

        $this->assertGraphQLForbiddenResponse('User user@example.com cannot delete frame 01HKM79KK7CSEV3XE2YD6PRTGZ');
    }

    public function provide testInvalidNotOwner(): iterable
    {
        yield 'not owner' => [
            DeleteFrameStory::ULID_FRAME_ADMIN,
        ];
    }
}
