import { put, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';

import HabitRecords from '../../models/HabitRecords';
import { HabitRecordsActions } from '../modules/HabitRecords';
import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';

function* getHabitRecords(action: ReturnType<typeof HabitRecordsActions.getHabitRecords>) {
  const searchString = action.payload;
  const params = { q: searchString };
  //const response = yield HabitApi.get(params);
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
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

export function* HabitRecordsSaga() {
  yield takeLatest(HabitRecordsActions.getHabitRecords, getHabitRecords);
}
