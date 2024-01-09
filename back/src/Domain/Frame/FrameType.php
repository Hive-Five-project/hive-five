<?php

declare(strict_types=1);

namespace App\Domain\Frame;

enum FrameType: string
{
    case Beehive = 'Beehive';
    case Riser = 'Riser';
}
