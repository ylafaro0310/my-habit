import { fork } from 'redux-saga/effects';

import { HabitsSaga } from './habits';
import { HabitRecordsSaga } from './habitRecords';
import { HabitSessionsSaga } from './habitSessions';

export const rootSaga = function* root() {
  yield fork(HabitsSaga);
  yield fork(HabitRecordsSaga);
  yield fork(HabitSessionsSaga);
};
