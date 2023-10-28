import { trans } from '@app/translations';
import ErrorLayout from '@app/layouts/ErrorLayout';
import ErrorPageContent from '@app/pages/Error/ErrorPageContent';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle(trans('pages.notFound.documentTitle'));

  return <ErrorLayout>
    <ErrorPageContent
      title={trans('pages.notFound.title')}
      subtitle={trans('pages.notFound.subtitle')}
      lead={trans('pages.notFound.lead')}
      content={trans('pages.notFound.content')}
    />
  </ErrorLayout>;
}
