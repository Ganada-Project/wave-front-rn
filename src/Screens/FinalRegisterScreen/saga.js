import { AsyncStorage } from 'react-native';

import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  POST_REGISTER_REQUESTING,
  POST_REGISTER_REQUESTING_FAIL,
  POST_REGISTER_REQUESTING_SUCCESS,
} from './constants';
import { API_URL } from '../../constants';
import { postRequest } from '../../utils/request';
import { startTabScreens } from '../../index';

function* registerUserSaga(action) {
  const url = `${API_URL}/auth/register`;
  const {
    password,
    weight,
    name,
    gender,
    height,
    waist,
    imageBase,
    nickname,
    stylesArray,
    phone,
  } = action.payload;
  const payload = {
    email: phone,
    password,
    sex: gender,
    nickname,
    name,
    phone,
    styles: stylesArray,
    bodyImageBase64: imageBase,
    weight,
    height,
    waist,
  };
  try {
    const result = yield call(postRequest, { url, payload });
    yield put({ type: POST_REGISTER_REQUESTING_SUCCESS, payload: { result } });
    yield AsyncStorage.setItem('wave.idToken', result.token);
    yield startTabScreens();
  } catch (error) {
    console.log(error);
    yield put({ type: POST_REGISTER_REQUESTING_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(POST_REGISTER_REQUESTING, registerUserSaga),
    // takeLatest(LOGIN_ERROR, logout),
    // loginWatcher(),
  ]);
}
