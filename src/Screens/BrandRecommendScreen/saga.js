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
import { postRequest } from '../../utils/request';

function* getBrandRecommendSaga(action) {
  const { stylesArray } = action;
  const url = `${API_URL}/style/recommend`;
  const payload = {
    styles: stylesArray,
  };
  try {
    const data = yield call(postRequest, { url, payload });
    const brands = data.result.map((brand) => ({ ...brand, selected: false }));
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
