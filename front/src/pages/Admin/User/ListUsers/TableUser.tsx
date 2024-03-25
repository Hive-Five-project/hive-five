import { WithPreviousUrl } from '@app/hooks/usePreviousUrlLocationState.tsx';

import { UserForAdmin as User } from '@app/models/types/User.ts';
interface Props {
  users: readonly User[]
  currentPage: number
  perPage?: number
}

export default function TableUser({
  users,
  currentPage,
  perPage = 10,
  previousUrl,
}: WithPreviousUrl<Props>) {

}
