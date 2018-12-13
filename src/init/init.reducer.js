import { REHYDRATE } from 'redux-persist';
import { createReducer } from '../utils';

const setRehydrateStatus = (state, action) => ({
  ...state,
  autoRehydrated: true,
})
export default {
  app: createReducer({
    [REHYDRATE]: setRehydrateStatus, 
  })
}