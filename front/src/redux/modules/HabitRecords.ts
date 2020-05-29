import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import HabitRecords from '../../models/HabitRecords';

// Action Creator
const actionCreator = actionCreatorFactory('HabitRecord');
export const HabitRecordsActions = {
  getHabitRecords: actionCreator<object>('getHabitRecords'),
  setHabitRecords: actionCreator<HabitRecords>('setHabitRecords'),
  addHabitRecord: actionCreator<object>('addHabitRecord'),
  removeHabitRecord: actionCreator<object>('removeHabitRecord'),
};

// Reducers
export const habitRecordsReducer = reducerWithInitialState(new HabitRecords()).case(
  HabitRecordsActions.setHabitRecords,
  (state, payload) => {
    return state.set('items', payload.getList());
  },
);
