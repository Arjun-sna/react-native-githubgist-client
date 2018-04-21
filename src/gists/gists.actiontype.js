import { createSagaActionSet } from '../utils';

export const userGistsFetch = createSagaActionSet('FETCH_USER_GISTS');
export const starredGistsFetch = createSagaActionSet('FETCH_USER_STARRED_GISTS');
export const publicGistsFetch = createSagaActionSet('FETCH_PUBLIC_GISTS');