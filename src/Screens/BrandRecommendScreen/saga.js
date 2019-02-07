/**
 * Gets the repositories of the user from Github
 */
import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  GET_BRAND_RECOMMEND_FAIL,
  GET_BRAND_RECOMMEND_REQUEST,
  GET_BRAND_RECOMMEND_SUCCESS,
} from './constants';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';

function* getBrandRecommendSaga() {
  const url = `${API_URL}/style`;
  try {
    let brands = yield call(getRequest, { url });
    brands = brands.result.map((style) => {
      const o = Object.assign({}, style);
      o.selected = false;
      return o;
    });
    yield put({
      type: GET_BRAND_RECOMMEND_SUCCESS,
      payload: { brands },
    });
  } catch (error) {
    yield put({ type: GET_BRAND_RECOMMEND_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_BRAND_RECOMMEND_REQUEST, getBrandRecommendSaga)]);
}
