import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Record } from 'immutable';

import HabitRecords from '../../models/HabitRecords';

// State
export class HabitRecordsState extends Record<{
  habitRecords: HabitRecords;
}>({
  habitRecords: new HabitRecords(),
}) {}

// Action Creator
const actionCreator = actionCreatorFactory('Habit');
export const HabitsActions = {
  addHabitRecord: actionCreator<HabitRecords>('addHabitRecord'),
  removeHabitRecord: actionCreator<HabitRecords>('removeHabitRecord'),
};

// Reducers
export const habitRecordsReducer = reducerWithInitialState(new HabitRecordsState())
  .case(HabitsActions.addHabitRecord, (state, payload) => {
    return state.set('habitRecords', payload);
  })
  .case(HabitsActions.removeHabitRecord, (state, payload) => {
    return state.set('habitRecords', payload);
  });
