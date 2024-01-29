import NotFound from '@app/pages/Error/NotFound';
import { Route, RouteDeclaration } from '@app/router/router';
import Login from '@app/pages/Auth/Login';
import Logout from '@app/pages/Auth/Logout';
import AppLayout from '@app/layouts/AppLayout';
import Admin from '@app/pages/Admin/Admin';
import NeedsLogin from '@app/guards/NeedsLogin';
import BlankLayout from '@app/layouts/BlankLayout';
import ForgotPassword from '@app/pages/Auth/ForgotPassword';
import ResetPassword from '@app/pages/Auth/ResetPassword';
import Profile from '@app/pages/Profile/Profile';
import User from '@app/pages/Admin/User/User';
import Home from '@app/pages/Home.tsx';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import NeedsAdmin from '@app/guards/NeedsAdmin.tsx';
import ApiaryList from './pages/Apiary/ApiaryList';
import ApiaryCreate from './pages/Apiary/Forms/ApiaryCreate.tsx';
import ApiaryUpdate from '@app/pages/Apiary/Forms/ApiaryUpdate.tsx';

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
        component: Admin,
      },
      {
        component: ListUsers,
      },
      {
        component: User,
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
    component: ApiaryList,
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
    component: ResetPassword,
    layout: BlankLayout,
  },
  {
    component: ApiaryCreate,
    layout: BlankLayout,
  },
  {
    component: ApiaryUpdate,
    layout: BlankLayout,
  },
  /* Error pages */
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;

