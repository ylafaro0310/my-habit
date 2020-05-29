import { HabitRecordsActions, habitRecordsReducer } from '../HabitRecords';
import HabitRecords from '../../../models/HabitRecords';

const habitRecords = new HabitRecords();
describe('habitRecordsReducer:', () => {
  it('Can set habitRecords', () => {
    const state = habitRecordsReducer(undefined, HabitRecordsActions.setHabitRecords(habitRecords));
    expect(state.equals(habitRecords)).toBeTruthy();
  });
});
