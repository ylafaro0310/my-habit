import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import { HabitsSaga } from '../habits';
import { HabitsApi } from '../../api/HabitsApi';
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
  data: data,
  isSuccess: true,
};

describe('HabitsSaga:', () => {
  it('getHabits()', () => {
    return expectSaga(HabitsSaga)
      .provide([[call(HabitsApi.get, { id: undefined }), response]])
      .put({ type: HabitsActions.setHabits.type, payload: Habits.fromResponse(response.data) })
      .dispatch({ type: HabitsActions.getHabits.type })
      .silentRun();
  });
  it('addHabit()', () => {
    const params = { habitName: 'test' };
    return expectSaga(HabitsSaga)
      .provide([[call(HabitsApi.post, params), response]])
      .put({ type: HabitsActions.setHabits.type, payload: Habits.fromResponse(response.data) })
      .dispatch({ type: HabitsActions.addHabit.type, payload: params })
      .silentRun();
  });
  it('removeHabit()', () => {
    const habitId = 1;
    return expectSaga(HabitsSaga)
      .provide([[call(HabitsApi.delete, habitId), response]])
      .put({ type: HabitsActions.setHabits.type, payload: Habits.fromResponse(response.data) })
      .dispatch({ type: HabitsActions.removeHabit.type, payload: habitId })
      .silentRun();
  });
});
