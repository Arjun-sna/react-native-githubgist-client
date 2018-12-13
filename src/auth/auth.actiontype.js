import { createActionSet, createSagaActionSet } from '../utils';

export const logIn = createSagaActionSet('LOGIN');
export const logOut = createActionSet('LOGOUT');
export const fetchAuthUser = createSagaActionSet('FETCH_AUTH_USER');
