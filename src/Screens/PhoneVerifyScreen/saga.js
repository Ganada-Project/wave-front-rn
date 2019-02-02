import {
  take,
  fork,
  cancel,
  call,
  put,
  cancelled,
  takeLatest,
  takeEvery,
  all,
} from 'redux-saga/effects';
import {
  VERIFY_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER_FAIL,
  VERIFY_PHONE_NUMBER_SUCCESS,
} from './constants';

import { verifyPhoneNumberApi } from './apis';

function* verifyPhoneNumberSaga(action) {
  const { number } = action.payload;
  try {
    const result = yield call(verifyPhoneNumberApi, { number });
    console.log(result);
    yield put({ type: VERIFY_PHONE_NUMBER_SUCCESS, payload: { result } });
  } catch (error) {
    yield put({ type: VERIFY_PHONE_NUMBER_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(VERIFY_PHONE_NUMBER, verifyPhoneNumberSaga)]);
}
