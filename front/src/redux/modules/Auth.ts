import actionCreatorFactory from 'typescript-fsa';

// Action Creator
const actionCreator = actionCreatorFactory('Auth');
export const AuthActions = {
  logout: actionCreator<void>('logout'),
};

// Reducers
