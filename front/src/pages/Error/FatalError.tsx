import { trans } from '@app/translations';
import ErrorLayout from '@app/layouts/ErrorLayout';
import ErrorPageContent from '@app/pages/Error/ErrorPageContent';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';

export default function FatalError() {
  useDocumentTitle(trans('pages.fatalError.documentTitle'));

  return <ErrorLayout>
    <ErrorPageContent
      title={trans('pages.fatalError.title')}
      subtitle={trans('pages.fatalError.subtitle')}
      lead={trans('pages.fatalError.lead')}
      content={trans('pages.fatalError.content')}
    />
  </ErrorLayout>;
}
