import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import HabitSessions from '../../models/HabitSessions';

// Action Creator
const actionCreator = actionCreatorFactory('HabitSession');
export const HabitSessionsActions = {
  getHabitSessions: actionCreator<object>('getHabitSessions'),
  setHabitSessions: actionCreator<HabitSessions>('setHabitSessions'),
  addHabitSession: actionCreator<object>('addHabitSession'),
  updateHabitSession: actionCreator<object>('updateHabitSession'),
  removeHabitSession: actionCreator<number>('removeHabitSession'),
  formInitialize: actionCreator<number>('habitSessionFormInitialize'),
};

// Reducers
export const HabitSessionsReducer = reducerWithInitialState(
  new HabitSessions(),
).case(HabitSessionsActions.setHabitSessions, (state, payload) => {
  return state.set('items', payload.getList());
});
