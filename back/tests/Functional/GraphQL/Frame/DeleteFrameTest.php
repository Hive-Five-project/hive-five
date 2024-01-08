<?php

declare(strict_types=1);

namespace App\Tests\Functional\GraphQL\Frame;

use App\Infrastructure\Test\Functional\Controller\GraphQLTestCase;
use App\Tests\Functional\GraphQL\Frame\DeleteFrameTest\fixtures\DeleteFrameStory;
use Symfony\Component\HttpFoundation\Response;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class DeleteFrameTest extends GraphQLTestCase
{
    use ResetDatabase;
    use Factories;

    /**
     * @dataProvider provide testValidForBeehive
     */
    public function testValidForBeehive(string $frameUid, string $beehiveUid): void
    {
        DeleteFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(['uid' => $frameUid], $this->getInputContent('testDeleteFrame'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();

        $result = $this->executeGraphQL(['uid' => $beehiveUid], $this->getInputContent('assertNullBeehive'));
        $this->assertBeehiveEmptyPostDeletion($result);
    }

    public function provide testValidForBeehive(): iterable
    {
        yield 'delete Frame' => [
            DeleteFrameStory::ULID_FRAME_BEEHIVE,
            DeleteFrameStory::ULID_BEEHIVE,
        ];
    }

    /**
     * @dataProvider provide testValidForRiser
     */
    public function testValidForRiser(string $frameUid, string $riserUid): void
    {
        DeleteFrameStory::load();

        $this->loginAsUser();

        $this->executeGraphQL(['uid' => $frameUid], $this->getInputContent('testDeleteFrame'));

        $this->assertValidGraphQLResponse();
        $this->assertJsonResponseMatchesExpectations();

        $result = $this->executeGraphQL(['uid' => $riserUid], $this->getInputContent('assertNullRiser'));
        $this->assertRiserEmptyPostDeletion($result);
    }

    public function provide testValidForRiser(): iterable
    {
        yield 'delete Frame' => [
            DeleteFrameStory::ULID_FRAME_RISER,
            DeleteFrameStory::ULID_RISER,
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

    private function assertBeehiveEmptyPostDeletion(Response $response): void
    {
        self::assertEquals('{"data":{"Beehive":{"find":{"uid":"01HKN2NV6TBX52GBQA7Q8M5PXD","frames":[]}}}}', $response->getContent());
    }

    private function assertRiserEmptyPostDeletion(Response $response): void
    {
        self::assertEquals('{"data":{"Riser":{"find":{"uid":"01HKNN32PW4VFC97WG8KG2S48S","frames":[]}}}}', $response->getContent());
    }
}
