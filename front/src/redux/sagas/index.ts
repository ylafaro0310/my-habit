import { fork } from 'redux-saga/effects';

import { HabitsSaga } from '../sagas/habits';
import { HabitRecordsSaga } from '../sagas/habitRecords';

export const rootSaga = function* root() {
  yield fork(HabitsSaga);
  yield fork(HabitRecordsSaga);
};
