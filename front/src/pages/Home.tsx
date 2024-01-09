import { declareUserRoute } from '@app/router/router';
import { useDocumentTitle } from '@mantine/hooks';

export default declareUserRoute(function Home() {
  useDocumentTitle('HiveFive');

  return <div>
    <h1>Bienvenue</h1>
  </div>;
}, '/');
