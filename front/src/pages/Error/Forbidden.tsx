import { trans } from '@app/translations';
import ErrorLayout from '@app/layouts/ErrorLayout';
import ErrorPageContent from '@app/pages/Error/ErrorPageContent';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';

export default function Forbidden() {
  useDocumentTitle(trans('pages.forbidden.documentTitle'));

  return <ErrorLayout>
    <ErrorPageContent
      title={trans('pages.forbidden.title')}
      subtitle={trans('pages.forbidden.subtitle')}
      lead={trans('pages.forbidden.lead')}
      content={trans('pages.forbidden.content')}
    />
  </ErrorLayout>;
}
