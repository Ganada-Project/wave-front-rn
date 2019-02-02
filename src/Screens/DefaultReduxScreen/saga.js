/**
 * Gets the repositories of the user from Github
 */
import { AsyncStorage } from 'react-native';
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
  FETCH_DEFAULT_REQUESTING,
  FETCH_DEFAULT_REQUESTING_FAIL,
  FETCH_DEFAULT_REQUESTING_SUCCESS,
} from './constants';
import { startTabScreens } from '../../index';
import { defaultApi } from './apis';

function* defaultFlow(action) {
  const {} = action.payload;
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    const idToken = yield call(defaultApi, {});
    yield put({ type: FETCH_DEFAULT_REQUESTING_SUCCESS });
    yield startTabScreens();
  } catch (error) {
    // error? send it to redux
    yield put({ type: FETCH_DEFAULT_REQUESTING_FAIL, error });
  }
  // return the token for health and wealth
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_DEFAULT_REQUESTING, defaultFlow),
    // takeLatest(LOGIN_ERROR, logout),
    // loginWatcher(),
  ]);
}
