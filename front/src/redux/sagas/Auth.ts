import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthActions } from '../modules/Auth';
import { AuthApi } from '../api/AuthApi';

function* login(action: ReturnType<typeof AuthActions.login>) {
  const params = action.payload;
  const response = yield call(AuthApi.login, params);
  if (response.isSuccess) {
    const payload = { isLoggedIn: true };
    yield put(AuthActions.loggedIn(payload));
  }
}

function* authCheck(action: ReturnType<typeof AuthActions.authCheck>) {
  const response = yield call(AuthApi.user);
  if (response.isSuccess) {
    const payload = { isLoggedIn: true };
    yield put(AuthActions.loggedIn(payload));
  } else {
    const payload = { isLoggedIn: false };
    yield put(AuthActions.loggedIn(payload));
  }
}

function* logout(action: ReturnType<typeof AuthActions.logout>) {
  const response = yield call(AuthApi.logout);
  if (response.isSuccess) {
    window.location.href = '/login';
  }
}
export function* AuthSaga() {
  yield takeLatest(AuthActions.login, login);
  yield takeLatest(AuthActions.authCheck, authCheck);
  yield takeLatest(AuthActions.logout, logout);
}
