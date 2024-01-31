import { declareRoute } from '@app/router/router';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useAuthContext } from '@app/hooks/useAuthContext';
import { PROFILE_PATH } from '@app/paths.ts';

export default declareRoute(function Profile() {
  useDocumentTitle('Profile');

  const { profile } = useAuthContext();

  return <div>
    <h1>Profile</h1>
    <p>{profile?.firstname}, {profile?.lastname}, {profile?.email}</p>
  </div>;
}, PROFILE_PATH);
