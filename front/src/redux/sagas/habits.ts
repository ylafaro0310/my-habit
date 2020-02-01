import { put, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';

import { HabitsActions } from '../modules/Habits';
import Habits from '../../models/Habits';
import { HabitApi } from '../api/HabitApi';

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
  data: data,
  isSuccess: true,
};

function* getHabits(action: ReturnType<typeof HabitsActions.getHabits>) {
  const searchString = action.payload;
  const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

function* addHabit(action: ReturnType<typeof HabitsActions.addHabit>) {
  const searchString = action.payload;
  const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

function* removeHabit(action: ReturnType<typeof HabitsActions.removeHabit>) {
  const searchString = action.payload;
  const params = { q: searchString };
  //const response = yield HabitApi.get(params);
  if (response.isSuccess) {
    yield put(HabitsActions.setHabits(Habits.fromResponse(response.data)));
  }
}

export function* HabitsSaga() {
  yield takeLatest(HabitsActions.getHabits, getHabits);
  yield takeLatest(HabitsActions.addHabit, addHabit);
  yield takeLatest(HabitsActions.removeHabit, removeHabit);
}
