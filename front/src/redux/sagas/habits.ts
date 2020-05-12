import { call, put, takeLatest } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { push } from 'connected-react-router';

import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';
import { HabitsApi } from '../api/HabitsApi';

function* getHabits(action: ReturnType<typeof HabitsActions.getHabits>) {
  //const id = action.payload;
  //const params = { id };
  const response = yield call(HabitsApi.getAll);
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
    yield put(push('records'));
  }
}

function* updateHabit(action: ReturnType<typeof HabitsActions.updateHabit>) {
  const { habitId, values } = action.payload;
  const params = values;
  const response = yield call(HabitsApi.patch, habitId, params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(push('records'));
  }
}

function* removeHabit(action: ReturnType<typeof HabitsActions.removeHabit>) {
  const id = action.payload;
  const response = yield call(HabitsApi.delete, id);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(push('records'));
  }
}

function* formInitialize(
  action: ReturnType<typeof HabitsActions.formInitialize>,
) {
  const id = action.payload;
  const response = yield call(HabitsApi.get, id);
  if (response.isSuccess) {
    //yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
    yield put(initialize('habit', response.data));
  }
}

export function* HabitsSaga() {
  yield takeLatest(HabitsActions.getHabits, getHabits);
  yield takeLatest(HabitsActions.addHabit, addHabit);
  yield takeLatest(HabitsActions.updateHabit, updateHabit);
  yield takeLatest(HabitsActions.removeHabit, removeHabit);
  yield takeLatest(HabitsActions.formInitialize, formInitialize);
}
