import { call, put, takeLatest } from 'redux-saga/effects';

import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';
import { HabitsApi } from '../api/HabitsApi';

function* getHabits(action: ReturnType<typeof HabitsActions.getHabits>) {
  const id = action.payload;
  const params = { id };
  const response = yield call(HabitsApi.get, params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

function* addHabit(action: ReturnType<typeof HabitsActions.addHabit>) {
  const values = action.payload;
  const params = values;
  const response = yield call(HabitsApi.post, params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

function* removeHabit(action: ReturnType<typeof HabitsActions.removeHabit>) {
  const id = action.payload;
  const response = yield call(HabitsApi.delete, id);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

export function* HabitsSaga() {
  yield takeLatest(HabitsActions.getHabits, getHabits);
  yield takeLatest(HabitsActions.addHabit, addHabit);
  yield takeLatest(HabitsActions.removeHabit, removeHabit);
}
