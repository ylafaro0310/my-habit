import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import HabitSessions from '../../models/HabitSessions';

// Action Creator
const actionCreator = actionCreatorFactory('HabitSession');
export const HabitSessionsActions = {
  getHabitSessions: actionCreator<{ habitId: number; values: object }>(
    'getHabitSessions',
  ),
  setHabitSessions: actionCreator<HabitSessions>('setHabitSessions'),
  addHabitSession: actionCreator<{ habitId: number; values: object }>(
    'addHabitSession',
  ),
  updateHabitSession: actionCreator<{ habitSessionId: number; values: object }>(
    'updateHabitSession',
  ),
  removeHabitSession: actionCreator<number>('removeHabitSession'),
  formInitialize: actionCreator<number>('habitSessionFormInitialize'),
};

// Reducers
export const HabitSessionsReducer = reducerWithInitialState(
  new HabitSessions(),
).case(HabitSessionsActions.setHabitSessions, (state, payload) => {
  return state.set('items', payload.getList());
});
