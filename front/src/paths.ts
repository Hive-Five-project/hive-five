/* --- ADMIN --- */
export const USER_LIST_PATH = '/list/users';
export const USER_PATH = '/user/:id';
export const USER_CREATE_PATH = '/user/create';
export const USER_UPDATE_PATH = '/user/update/:id';

/* --- AUTH --- */
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const FORGOT_PASSWORD_CONFIRMATION_PATH = '/forgot-password-confirmation';
export const RESET_PASSWORD_PATH = '/reset-password/:token';

/* --- MAIN --- */
export const PROFILE_PATH = '/profile';
export const PROFILE_UPDATE_PATH = PROFILE_PATH + '/update';
export const APIARY_ROOT_PATH = '/apiary';
export const APIARY_LIST_PATH = APIARY_ROOT_PATH + '/list';
export const APIARY_ADD_PATH = APIARY_ROOT_PATH + '/add';
export const APIARY_HOME_PATH = APIARY_ROOT_PATH + '/:uid';
export const APIARY_UPDATE_PATH = APIARY_ROOT_PATH + '/update/:uid';
export const BEEHIVE_ROOT_PATH = '/beehive';
export const BEEHIVE_HOME_PATH = BEEHIVE_ROOT_PATH + '/:uid';
export const BEEHIVE_ADD_PATH = APIARY_HOME_PATH + '/beehive/add';
export const BEEHIVE_UPDATE_PATH = BEEHIVE_ROOT_PATH + '/update/:uid';

/* --- SECONDARY --- */
export const SHOPPING_CART='/cart';
export const ABOUT='/about';
