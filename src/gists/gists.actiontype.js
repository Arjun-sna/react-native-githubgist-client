import { createSagaActionSet } from '../utils';

export const fetchGistComments = createSagaActionSet('FETCH_GIST_COMMENTS');
export const userGistsFetch = createSagaActionSet('FETCH_USER_GISTS');
export const starredGistsFetch = createSagaActionSet('FETCH_USER_STARRED_GISTS');
export const publicGistsFetch = createSagaActionSet('FETCH_PUBLIC_GISTS');
export const toggleFavoriteGist = createSagaActionSet('TOGGLE_FAVORITE_GIST');
export const fetchInitialFavoriteValue = createSagaActionSet('INITIAL_FAVORITE_VALUE');
export const UnstarGist = createSagaActionSet('UNSTAR_GIST');
export const deleteComment = createSagaActionSet('DELETE_COMMENT');
export const addComment = createSagaActionSet('ADD_COMMENT');
