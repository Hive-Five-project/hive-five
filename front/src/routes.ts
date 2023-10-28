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
import Profile from '@app/pages/User/Profile/Profile';
import User from '@app/pages/User/User.tsx';
import Home from '@app/pages/Home.tsx';
import ListUsers from '@app/pages/Admin/User/ListUsers/ListUsers.tsx';
import NeedsAdmin from '@app/guards/NeedsAdmin.tsx';

export const AdminPages: RouteDeclaration = {
  path: '/admin',
  relativePath: '/admin',
};

export const UserPages: RouteDeclaration = {
  path: '/user',
  relativePath: '/user',
};

export const routes: Array<Route> = [
  {
    path: '/',
    layout: AppLayout,
    guard: NeedsLogin,
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
    ],
  },
  /* Users pages - Admin can also access */
  {
    path: UserPages.path,
    layout: AppLayout,
    guard: NeedsLogin,
    routes: [
      {
        component: User,
      },
      {
        component: Profile,
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

