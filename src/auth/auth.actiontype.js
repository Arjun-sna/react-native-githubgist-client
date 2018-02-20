import { createActionSet, createSagaActionSet } from '../utils';

export const LOGIN = createSagaActionSet('LOGIN');
export const LOGOUT = createActionSet('LOGOUT');
export const FETCH_AUTH_USER = createActionSet('FETCH_AUTH_USER');