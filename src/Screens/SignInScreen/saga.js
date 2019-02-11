/**
 * Gets the repositories of the user from Github
 */
import { AsyncStorage } from 'react-native';
import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { FETCH_USER_REQUESTING } from '../App/constants';
import { fetchUserFlow } from '../App/saga';
import { LOGIN_ERROR, LOGIN_REQUESTING, LOGIN_SUCCESS } from './constants';
import { API_URL } from '../../constants';
import { postRequest } from '../../utils/request';
import { startTabScreens } from '../../index';

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
  const url = `${API_URL}/auth/login/user`;
  const { phone, password } = action.payload;
  const payload = {
    phone,
    password,
  };
  let result;
  try {
    result = yield call(postRequest, { url, payload });
    yield setIdToken(result.token);
    yield put({ type: LOGIN_SUCCESS });
    yield put({ type: FETCH_USER_REQUESTING });
    yield fetchUserFlow({ token: result.token });
    yield startTabScreens();
  } catch (error) {
    console.log(error);
    // error? send it to redux
    yield removeIdToken();
    yield put({ type: LOGIN_ERROR, error });
  }
  // return the token for health and wealth
}

export default function* rootSaga() {
  yield all([takeLatest(LOGIN_REQUESTING, loginFlow)]);
}
