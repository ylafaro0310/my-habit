import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import { HabitRecordsSaga } from '../habitRecords';
import { HabitRecordsActions } from '../../modules/HabitRecords';
import HabitRecords from '../../../models/HabitRecords';
import { HabitRecordsApi } from '../../api/HabitRecordsApi';
import { HabitsActions } from '../../modules/Habits';
import Habits from '../../../models/Habits';

const data = {
  habits: [
    { id: 1, habitName: '読書する' },
    { id: 2, habitName: '筋トレ' },
    { id: 3, habitName: '新しいCDを1枚聴く' },
  ],
  habitRecords: [
    { habitId: 2, completedAt: dayjs() },
    { habitId: 1, completedAt: dayjs('2020-01-08') },
  ],
};
const response = {
  data,
  isSuccess: true,
};

describe('HabitRecordsSaga:', () => {
  it('getHabitRecords()', () => {
    const params = { id: undefined };
    expectSaga(HabitRecordsSaga)
      .provide([[call(HabitRecordsApi.get, params), response]])
      .put({ type: HabitsActions.setHabits, payload: Habits.fromResponse(response.data) })
      .put({ type: HabitRecordsActions.setHabitRecords, payload: HabitRecords.fromResponse(response.data) })
      .dispatch({ type: HabitRecordsActions.getHabitRecords.type })
      .silentRun();
  });
  it('addHabitRecord()', () => {
    const params = { habitId: 1 };
    expectSaga(HabitRecordsSaga)
      .provide([[call(HabitRecordsApi.post, params), response]])
      .put({ type: HabitsActions.setHabits, payload: Habits.fromResponse(response.data) })
      .put({ type: HabitRecordsActions.setHabitRecords, payload: HabitRecords.fromResponse(response.data) })
      .dispatch({ type: HabitRecordsActions.addHabitRecord.type, params })
      .silentRun();
  });
  it('removeHabitRecord()', () => {
    const habitRecordId = 1;
    expectSaga(HabitRecordsSaga)
      .provide([[call(HabitRecordsApi.delete, habitRecordId), response]])
      .put({ type: HabitsActions.setHabits, payload: Habits.fromResponse(response.data) })
      .put({ type: HabitRecordsActions.setHabitRecords, payload: HabitRecords.fromResponse(response.data) })
      .dispatch({ type: HabitRecordsActions.removeHabitRecord.type, habitRecordId })
      .silentRun();
  });
});
