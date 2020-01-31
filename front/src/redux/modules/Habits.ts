import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Record } from 'immutable';

import Habits from '../../models/Habits';

// State
export class HabitsState extends Record<{
  habits: Habits;
}>({
  habits: new Habits(),
}) {}

// Action Creator
const actionCreator = actionCreatorFactory('Habit');
export const HabitsActions = {
  addHabit: actionCreator<Habits>('addHabit'),
  removeHabit: actionCreator<Habits>('removeHabit'),
};

// Reducers
export const habitsReducer = reducerWithInitialState(new HabitsState())
  .case(HabitsActions.addHabit, (state, payload) => {
    return state.set('habits', payload);
  })
  .case(HabitsActions.removeHabit, (state, payload) => {
    return state.set('habits', payload);
  });
