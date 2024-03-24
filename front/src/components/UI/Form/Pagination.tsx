import { Box, Button } from '@mantine/core';
import Link from '@app/components/Router/Link.tsx';

interface Props {
  current: number
  pages: ReadonlyArray<string>
}

export default function Pagination({
  current,
  pages,
}: Props) {
  const currentIdx = current - 1;
  const previousPage = pages[currentIdx - 1];
  const nextPage = pages[currentIdx + 1];

  return <Box>

    <Box>
      <Button variant="neutral" disabled={current <= 1}>
        <Link to={previousPage}>
          Précédent
        </Link>
      </Button>
    </Box>

    {pages.map((page, i) => <PaginationItem
      key={page}
      url={page}
      number={i + 1}
      active={i === currentIdx}
    />)}

    <Box>
      <Button variant="neutral" disabled={current >= pages.length}>
        <Link to={nextPage}>
          Suivant
        </Link>
      </Button>
    </Box>

  </Box>;
}

interface PaginationItemProps {
  url: string
  number: number
  active: boolean
}

function PaginationItem({
  url,
  number,
  active,
}: PaginationItemProps) {
  return <Box>
    <Button
      variant={active ? 'primary' : 'neutral'}
    >
      <Link to={url}>
        {number}
      </Link>
    </Button>
  </Box>;
}
