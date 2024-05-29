import { declareRoute } from '@app/router/router';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useAuthContext } from '@app/hooks/useAuthContext';
import { PROFILE_PATH, PROFILE_UPDATE_PATH} from '@app/paths.ts';
import {Avatar} from "@mantine/core";
import {Link} from "react-router-dom";
import DefaultProfileIcon from '@app/assets/DefaultProfileIcon';
import {trans} from "@app/translations";

export default declareRoute(function Profile() {
  useDocumentTitle('Profile');

  const {profile} = useAuthContext();

  return <div style={{
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'inherit',
  }}>
    <Avatar
      component="div"
      alt="Profile"
      variant="transparent"
      size="100px"
      style={{
        cursor: 'pointer',
        margin: '20px auto',
        display: 'block',
      }}
    >
      <DefaultProfileIcon/>
    </Avatar>
    <h1 style={{margin: '10px 0'}}>{profile?.firstname} {profile?.lastname}</h1>
    <div style={{textAlign: 'left', margin: 'auto', width: 'fit-content', fontSize: '16px'}}>
      <div style={{color: '#808080'}}>{trans('pages.profile.emailLabel')}</div>
      <div>{profile?.email}</div>
    </div>
    <p><Link to={`${PROFILE_UPDATE_PATH}`}
      style={{color: 'blue', textDecoration: 'none', fontSize: '18px', marginTop: '10px'}}>{trans('pages.profile.updateProfile')}</Link></p>
  </div>
},  PROFILE_PATH );
