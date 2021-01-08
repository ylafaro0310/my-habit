import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import HabitSessions from '../../models/HabitSessions';

// Action Creator
const actionCreator = actionCreatorFactory('HabitSession');
export const HabitSessionsActions = {
  getHabitSessions: actionCreator<{ habitId: number; values?: object }>(
    'getHabitSessions',
  ),
  setHabitSessions: actionCreator<HabitSessions>('setHabitSessions'),
  resetHabitSessions: actionCreator('resetHabitSessions'),
  addHabitSession: actionCreator<{ habitId: number; values: object }>(
    'addHabitSession',
  ),
  updateHabitSession: actionCreator<{
    habitId: number;
    habitSessionId: number;
    values: object;
  }>('updateHabitSession'),
  removeHabitSession: actionCreator<{
    habitId: number;
    habitSessionId: number;
  }>('removeHabitSession'),
  formInitialize: actionCreator<{ habitId: number; habitSessionId: number }>(
    'habitSessionFormInitialize',
  ),
};

// Reducers
export const HabitSessionsReducer = reducerWithInitialState(
  new HabitSessions(),
).case(HabitSessionsActions.setHabitSessions, (state, payload) => {
  return state.set('items', state.getList().concat(payload.getList()));
}).case(HabitSessionsActions.resetHabitSessions, (state, payload) => {
  return new HabitSessions();
});
