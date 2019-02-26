import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

import {
  GET_BRAND_RECOMMEND_REQUESTING,
  GET_BRAND_RECOMMEND_FAIL,
  GET_BRAND_RECOMMEND_SUCCESS,
} from './constants';

export function* getBrandRecommendSaga() {
  const url = `${API_URL}/brand/recommend`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: GET_BRAND_RECOMMEND_SUCCESS, brands: result.brands });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_BRAND_RECOMMEND_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_BRAND_RECOMMEND_REQUESTING, getBrandRecommendSaga),
  ]);
}
