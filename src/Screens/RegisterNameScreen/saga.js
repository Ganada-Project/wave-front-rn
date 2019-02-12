import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';

import {
  CHECK_NICKNAME_FAIL,
  CHECK_NICKNAME_REQUEST,
  CHECK_NICKNAME_SUCCESS,
} from './constants';
import { API_URL } from '../../constants';
import { postRequest } from '../../utils/request';

function* checkNicknameSaga(action) {
  const url = `${API_URL}/auth/check/nickname`;
  const { nickname } = action;
  const payload = {
    nickname,
  };
  try {
    const result = yield call(postRequest, { url, payload });
    console.log(result);
    yield put({ type: CHECK_NICKNAME_SUCCESS, overlap: result.overlap });
  } catch (error) {
    console.log(error);
    // error? send it to redux
    yield put({ type: CHECK_NICKNAME_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(CHECK_NICKNAME_REQUEST, checkNicknameSaga)]);
}
