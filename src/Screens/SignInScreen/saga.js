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
import { FETCH_USER_REQUESTING } from '../App/constants';
import { fetchUserFlow } from '../App/saga';
import { LOGIN_ERROR, LOGIN_REQUESTING, LOGIN_SUCCESS } from './constants';
import { startTabScreens } from '../../index';
import { getIdTokenApi } from './apis';

const setIdToken = async (idToken) => {
  try {
    await AsyncStorage.setItem('wave.idToken', idToken);
  } catch (error) {
    // Error saving data
  }
};

const removeIdToken = async () => {
  try {
    await AsyncStorage.removeItem('wave.idToken');
  } catch (error) {
    // Error saving data
  }
};

function* loginFlow(action) {
  const { email, password } = action.payload;
  let idToken;
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    idToken = yield call(getIdTokenApi, { email, password });
    yield setIdToken(idToken);
    yield put({ type: LOGIN_SUCCESS });
    yield put({ type: FETCH_USER_REQUESTING, idToken });
    yield fetchUserFlow({});
  } catch (error) {
    // error? send it to redux
    yield removeIdToken();
    yield put({ type: LOGIN_ERROR, error });
  }
  // return the token for health and wealth
  return idToken;
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN_REQUESTING, loginFlow),
    // takeLatest(LOGIN_ERROR, logout),
    // loginWatcher(),
  ]);
}
