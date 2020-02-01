import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import HabitRecords from '../../models/HabitRecords';

// Action Creator
const actionCreator = actionCreatorFactory('HabitRecord');
export const HabitRecordsActions = {
  getHabitRecords: actionCreator<void>('getHabitRecords'),
  setHabitRecords: actionCreator<HabitRecords>('setHabitRecords'),
  addHabitRecord: actionCreator<HabitRecords>('addHabitRecord'),
  removeHabitRecord: actionCreator<HabitRecords>('removeHabitRecord'),
};

// Reducers
export const habitRecordsReducer = reducerWithInitialState(new HabitRecords())
  .case(HabitRecordsActions.setHabitRecords, (state, payload) => {
    return state.set('items', payload.getList());
  })
  .case(HabitRecordsActions.addHabitRecord, (state, payload) => {
    return state.set('items', payload.getList());
  })
  .case(HabitRecordsActions.removeHabitRecord, (state, payload) => {
    return state.set('items', payload.getList());
  });
