import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { API_URL } from '../../constants';
import { getRequest, postRequest } from '../../utils/request';
import {
  VERIFY_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER_FAIL,
  VERIFY_PHONE_NUMBER_SUCCESS,
  CHECK_PHONE_NUMBER_FAIL,
  CHECK_PHONE_NUMBER_REQUEST,
  CHECK_PHONE_NUMBER_SUCCESS,
} from './constants';

function* verifyPhoneNumberSaga(action) {
  const { number } = action.payload;
  const url = `${API_URL}/auth/check/user/phone`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: VERIFY_PHONE_NUMBER_SUCCESS, payload: { result } });
  } catch (error) {
    yield put({ type: VERIFY_PHONE_NUMBER_FAIL, error });
  }
}

function* checkPhoneNumberSaga(action) {
  const { number } = action;
  const url = `${API_URL}/auth/phone?phone=${number}`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: CHECK_PHONE_NUMBER_SUCCESS, overlap: result.overlap });
  } catch (error) {
    console.log(error);
    yield put({ type: CHECK_PHONE_NUMBER_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(VERIFY_PHONE_NUMBER, verifyPhoneNumberSaga)]);
  yield all([takeLatest(CHECK_PHONE_NUMBER_REQUEST, checkPhoneNumberSaga)]);
}
