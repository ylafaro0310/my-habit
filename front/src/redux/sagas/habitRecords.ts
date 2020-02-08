import { call, put, takeLatest } from 'redux-saga/effects';

import HabitRecords from '../../models/HabitRecords';
import { HabitRecordsActions } from '../modules/HabitRecords';
import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';
import { HabitRecordsApi } from '../api/HabitRecordsApi';

function* getHabitRecords(action: ReturnType<typeof HabitRecordsActions.getHabitRecords>) {
  const params = action.payload;
  const response = yield call(HabitRecordsApi.get, params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

function* addHabitRecord(action: ReturnType<typeof HabitRecordsActions.addHabitRecord>) {
  const params = action.payload;
  const response = yield call(HabitRecordsApi.post, params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(HabitRecordsActions.setHabitRecords(HabitRecords.fromResponse(response.data)));
  }
}

function* removeHabitRecord(action: ReturnType<typeof HabitRecordsActions.removeHabitRecord>) {
  const id = action.payload;
  const response = yield call(HabitRecordsApi.delete, id);
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
