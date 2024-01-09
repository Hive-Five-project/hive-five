import { APIARY_LIST_PATH } from '@app/paths';
import { declareUserRoute } from '@app/router/router';
import { useDocumentTitle } from '@mantine/hooks';

export default declareUserRoute(function Home() {
  useDocumentTitle('HiveFive');

  return <div>
    <h1>Liste des ruchers</h1>
  </div>;
}, APIARY_LIST_PATH);
