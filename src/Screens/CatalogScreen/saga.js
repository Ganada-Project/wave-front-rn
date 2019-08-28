import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

import {
  GET_ITEMS_REQUESTING,
  GET_ITEMS_FAIL,
  GET_ITEMS_SUCCESS,
} from './constants';

export function* getItemsSaga() {
  const url = `${API_URL}/item/0/10`;
  try {
    const result = yield call(getRequest, { url });
    console.log(result);
    yield put({ type: GET_ITEMS_SUCCESS, brands: result.items });
  } catch (error) {
    yield put({ type: GET_ITEMS_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_ITEMS_REQUESTING, getItemsSaga)]);
}
