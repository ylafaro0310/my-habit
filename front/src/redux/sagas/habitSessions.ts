import { call, put, takeLatest } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { push } from 'connected-react-router';

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
    yield put(push('/habits/' + habitId + '/sessions/list'));
  }
}

function* updateHabitSession(
  action: ReturnType<typeof HabitSessionsActions.updateHabitSession>,
) {
  const params = action.payload;
  const { habitId, habitSessionId, values } = params;
  const response = yield call(HabitSessionsApi.patch, habitSessionId, values);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
    yield put(push('/habits/' + habitId + '/sessions/list'));
  }
}

function* removeHabitSession(
  action: ReturnType<typeof HabitSessionsActions.removeHabitSession>,
) {
  const params = action.payload;
  const { habitId, habitSessionId } = params;
  const response = yield call(HabitSessionsApi.delete, habitSessionId);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
    yield put(push('/habits/' + habitId + '/sessions/list'));
  }
}

function* formInitialize(
  action: ReturnType<typeof HabitSessionsActions.formInitialize>,
) {
  const { habitId, habitSessionId } = action.payload;
  const response = yield call(HabitSessionsApi.get, habitId);
  if (response.isSuccess) {
    yield put(
      HabitSessionsActions.setHabitSessions(
        HabitSessions.fromResponse(response.data),
      ),
    );
    yield put(
      initialize(
        'habitSession',
        response.data.habitSessions.find(
          (elem: any) => elem.id === habitSessionId,
        ),
      ),
    );
  }
}

export function* HabitSessionsSaga() {
  yield takeLatest(HabitSessionsActions.getHabitSessions, getHabitSessions);
  yield takeLatest(HabitSessionsActions.addHabitSession, addHabitSession);
  yield takeLatest(HabitSessionsActions.updateHabitSession, updateHabitSession);
  yield takeLatest(HabitSessionsActions.removeHabitSession, removeHabitSession);
  yield takeLatest(HabitSessionsActions.formInitialize, formInitialize);
}
