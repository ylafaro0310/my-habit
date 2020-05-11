import { call, put, takeLatest } from 'redux-saga/effects';

import HabitSessions from '../../models/HabitSessions';
import { HabitSessionsActions } from '../modules/HabitSessions';
import { HabitSessionsApi } from '../api/HabitSessionsApi';

function* getHabitSessions(
  action: ReturnType<typeof HabitSessionsActions.getHabitSessions>,
) {
  const params = action.payload;
  const { habitId, values } = params;
  const response = yield call(HabitSessionsApi.get, habitId, values);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
  }
}

function* addHabitSession(
  action: ReturnType<typeof HabitSessionsActions.addHabitSession>,
) {
  const params = action.payload;
  const { habitId, values } = params;
  const response = yield call(HabitSessionsApi.post, habitId, values);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
  }
}

function* updateHabitSession(
  action: ReturnType<typeof HabitSessionsActions.updateHabitSession>,
) {
  const params = action.payload;
  const { habitSessionId, values } = params;
  const response = yield call(HabitSessionsApi.patch, habitSessionId, values);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
  }
}

function* removeHabitSession(
  action: ReturnType<typeof HabitSessionsActions.removeHabitSession>,
) {
  const params = action.payload;
  const response = yield call(HabitSessionsApi.delete, params);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
  }
}

export function* HabitSessionsSaga() {
  yield takeLatest(HabitSessionsActions.getHabitSessions, getHabitSessions);
  yield takeLatest(HabitSessionsActions.addHabitSession, addHabitSession);
  yield takeLatest(HabitSessionsActions.updateHabitSession, updateHabitSession);
  yield takeLatest(HabitSessionsActions.removeHabitSession, removeHabitSession);
}
