import { useCallback, useEffect, useRef } from 'react';
import { trans } from '@app/translations';

/**
 * Sets the document title.
 */
export function useDocumentTitle(
  title?: string | null,
  options = {
    retainOnUnmount: false,
    suffix: null,
  },
) {
  const { retainOnUnmount } = options;
  const suffix = options.suffix === null ? trans('documentTitleSuffix') : options.suffix;
  const defaultTitle = useRef(document.title);

  const replace = useCallback((newTitle : string) => {
    defaultTitle.current = document.title;
    document.title = newTitle + suffix;
  }, [suffix]);

  const reset = useCallback(() => {
    document.title = defaultTitle.current;
  }, []);

  useEffect(() => {
    if (!title) {
      return;
    }

    document.title = title + suffix;
  }, [suffix, title]);

  useEffect(() => {
    const previousTitle = defaultTitle.current;

    return () => {
      // Unless we asked to keep it
      if (retainOnUnmount) {
        return;
      }

      // restore the previous title when the component unmounts:
      document.title = previousTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { replace, reset };
}
