import { useLocation } from 'react-router-dom';

interface LocationState {
  previousUrl?: string
}

export type WithPreviousUrl<T> = T & Pick<LocationState, 'previousUrl'>

export default function usePreviousUrlFromLocation(): LocationState {
  return (useLocation().state ?? {}) as LocationState;
}
