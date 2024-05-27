import NotFound from '@app/pages/Error/NotFound';
import { Route, RouteDeclaration } from '@app/router/router';
import Login from '@app/pages/Auth/Login';
import Logout from '@app/pages/Auth/Logout';
import AppLayout from '@app/layouts/AppLayout';
import NeedsLogin from '@app/guards/NeedsLogin';
import BlankLayout from '@app/layouts/BlankLayout';
import ForgotPassword from '@app/pages/Auth/ForgotPassword';
import ResetPassword from '@app/pages/Auth/ResetPassword';
import Profile from '@app/pages/Profile/Profile';
import Home from '@app/pages/Home.tsx';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import NeedsAdmin from '@app/guards/NeedsAdmin.tsx';
import ApiaryList from './pages/Apiary/ApiaryList';
import ForgotPasswordConfirmation from './pages/Auth/ForgotPasswordConfirmation';
import ApiaryCreate from './pages/Apiary/Forms/ApiaryCreate.tsx';
import ApiaryUpdate from '@app/pages/Apiary/Forms/ApiaryUpdate.tsx';
import ApiaryHome from './pages/Apiary/ApiaryHome.tsx';
import BeehiveHome from '@app/pages/Beehive/BeehiveHome.tsx';
import UserCreate from '@app/pages/Admin/User/Forms/UserCreate.tsx';
import UserUpdate from '@app/pages/Admin/User/Forms/UserUpdate.tsx';

export const AdminPages: RouteDeclaration = {
  path: '/admin',
  relativePath: '/admin',
};

export const routes: Array<Route> = [
  {
    path: '/',
    layout: BlankLayout,
    component: Home,
  },
  /* Admin pages */
  {
    path: AdminPages.path,
    layout: AppLayout,
    guard: NeedsAdmin,
    routes: [
      {
        component: ListUsers,
      },
      {
        component: UserCreate,
      },
      {
        component: UserUpdate,
      },
    ],
  },
  /* Users pages - Admin can also access */
  {
    layout: AppLayout,
    guard: NeedsLogin,
    component: Profile,
  },
  {
    layout: AppLayout,
    guard: NeedsLogin,
    routes: [
      {
        component: ApiaryList,
      },
      {
        component: ApiaryHome,
      },
      {
        component: ApiaryCreate,
      },
      {
        component: ApiaryUpdate,
      },
    ],
  },
  {
    layout: AppLayout,
    guard: NeedsLogin,
    routes: [
      {
        component: BeehiveHome,
      },
    ],
  },
  /* Auth pages */
  {
    component: Login,
    layout: BlankLayout,
  },
  {
    component: Logout,
    layout: BlankLayout,
  },
  {
    component: ForgotPassword,
    layout: BlankLayout,
  },
  {
    component: ForgotPasswordConfirmation,
    layout: BlankLayout,
  },
  {
    component: ResetPassword,
    layout: BlankLayout,
  },
  /* Error pages */
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;

