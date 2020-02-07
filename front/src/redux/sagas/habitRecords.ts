import { put, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';

import HabitRecords from '../../models/HabitRecords';
import { HabitRecordsActions } from '../modules/HabitRecords';
import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';

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

function* getHabitRecords(action: ReturnType<typeof HabitRecordsActions.getHabitRecords>) {
  //const searchString = action.payload;
  //const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

function* addHabitRecord(action: ReturnType<typeof HabitRecordsActions.addHabitRecord>) {
  //const searchString = action.payload;
  //const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

function* removeHabitRecord(action: ReturnType<typeof HabitRecordsActions.removeHabitRecord>) {
  //const searchString = action.payload;
  //const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

export function* HabitRecordsSaga() {
  yield takeLatest(HabitRecordsActions.getHabitRecords, getHabitRecords);
  yield takeLatest(HabitRecordsActions.addHabitRecord, addHabitRecord);
  yield takeLatest(HabitRecordsActions.removeHabitRecord, removeHabitRecord);
}
