/**
 * Gets the repositories of the user from Github
 */
import AsyncStorage from '@react-native-community/async-storage';
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
  GET_STYLES_REQUESTING,
  GET_STYLES_REQUESTING_FAIL,
  GET_STYLES_REQUESTING_SUCCESS,
} from './constants';
import { startTabScreens } from '../../index';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

function* getStylesSaga(action) {
  console.log('Saga');
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    const url = `${API_URL}/style`;
    const result = yield call(getRequest, { url });
    console.log(result);
    yield put({ type: GET_STYLES_REQUESTING_SUCCESS, result: result.result });
  } catch (error) {
    // error? send it to redux
    yield put({ type: GET_STYLES_REQUESTING_FAIL, error });
  }
  // return the token for health and wealth
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_STYLES_REQUESTING, getStylesSaga),
    // takeLatest(LOGIN_ERROR, logout),
    // loginWatcher(),
  ]);
}
