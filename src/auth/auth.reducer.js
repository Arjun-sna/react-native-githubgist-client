import { createReducer } from '../utils';
import { logIn, fetchAuthUser } from './auth.actiontype';

const setUserFetchInProgress = state => ({
  ...state,
  inprogress: true,
});

const setAuthProgress = state => ({
  ...state,
  inprogress: true,
  isAuthenticated: false,
});

const setAuthData = (state, { payload: { access_token } }) => ({
  ...state,
  inprogress: false,
  isAuthenticated: true,
  access_token,
});

const setUserData = (state, { payload: userData }) => ({
  ...state,
  inprogress: false,
  userId: userData.id,
  pic: userData.avatar_url,
  email: userData.email,
  followers: userData.followers,
  following: userData.following,
  displayName: userData.name,
  userName: userData.login,
  privateGistsCount: userData.private_gists,
  publicGistsCount: userData.public_gists,
});

const setError = (state, { error }) => ({
  ...state,
  inprogress: false,
  error,
});

export default {
  auth: createReducer({
    [logIn.progressType]: setAuthProgress,
    [logIn.successType]: setAuthData,
    [logIn.errorType]: setError,
  }),
  loggedInUser: createReducer({
    [fetchAuthUser.progressType]: setUserFetchInProgress,
    [fetchAuthUser.successType]: setUserData,
    [fetchAuthUser.errorType]: setError,
  }),
};
