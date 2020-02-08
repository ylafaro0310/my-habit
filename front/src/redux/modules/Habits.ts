import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import Habits from '../../models/Habits';

// Action Creator
const actionCreator = actionCreatorFactory('Habit');
export const HabitsActions = {
  getHabits: actionCreator<void>('getHabits'),
  setHabits: actionCreator<Habits>('setHabits'),
  addHabit: actionCreator<object>('addHabit'),
  removeHabit: actionCreator<number>('removeHabit'),
};

// Reducers
export const habitsReducer = reducerWithInitialState(new Habits()).case(HabitsActions.setHabits, (state, payload) => {
  return state.set('items', payload.getList());
});
