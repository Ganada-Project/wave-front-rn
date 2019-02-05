/**
 * Gets the repositories of the user from Github
 */
import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  FETCH_STYLES_REQUESTING,
  FETCH_STYLES_REQUESTING_SUCCESS,
  FETCH_STYLES_REQUESTING_FAIL,
} from './constants';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';

function* getAllStylesSaga() {
  const url = `${API_URL}/style`;
  try {
    let styles = yield call(getRequest, { url });
    styles = styles.result.map((style) => {
      const o = Object.assign({}, style);
      o.selected = false;
      return o;
    });
    yield put({
      type: FETCH_STYLES_REQUESTING_SUCCESS,
      payload: { styles },
    });
  } catch (error) {
    yield put({ type: FETCH_STYLES_REQUESTING_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(FETCH_STYLES_REQUESTING, getAllStylesSaga)]);
}
