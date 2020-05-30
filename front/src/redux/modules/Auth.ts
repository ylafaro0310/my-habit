import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Auth } from '../../models/Auth';

// Action Creator
const actionCreator = actionCreatorFactory('Auth');
export const AuthActions = {
  login: actionCreator<object>('login'),
  loggedIn: actionCreator<{ isLoggedIn: boolean }>('loggedIn'),
  authCheck: actionCreator<void>('authCheck'),
  logout: actionCreator<void>('logout'),
  register: actionCreator<object>('register'),
  setErrors: actionCreator<{errors: []}>('setErrors'),
};

// Reducers
export const AuthReducer = reducerWithInitialState(new Auth()).case(
  AuthActions.loggedIn,
  (state, payload) => {
    return state.set('isLoggedIn', payload.isLoggedIn);
  }
).case(
  AuthActions.setErrors,
  (state, payload) => {
    return state.set('errors', payload.errors);
  }
);
