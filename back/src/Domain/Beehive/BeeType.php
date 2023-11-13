<?php

declare(strict_types=1);

namespace App\Domain\Beehive;

enum BeeType: string
{
    case Black = 'Black';
    case Italian = 'Italian';
    case Caucasian = 'Caucasian';
    case Carnolien = 'Carnolien';
    case Buckfast = 'Buckfast';
}
