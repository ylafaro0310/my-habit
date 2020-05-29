import { call, takeLatest } from 'redux-saga/effects';

import { AuthActions } from '../modules/Auth';
import { AuthApi } from '../api/AuthApi';

function* logout(action: ReturnType<typeof AuthActions.logout>) {
  yield call(AuthApi.logout);
}
export function* AuthSaga() {
  yield takeLatest(AuthActions.logout, logout);
}
