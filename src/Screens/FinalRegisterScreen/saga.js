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
  POST_REGISTER_REQUESTING,
  POST_REGISTER_REQUESTING_FAIL,
  POST_REGISTER_REQUESTING_SUCCESS,
} from './constants';
import { startTabScreens } from '../../index';
import { registerUserApi } from './apis';

function* registerUserSaga(action) {
  console.log('!!!');
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
  try {
    const result = yield call(registerUserApi, {
      password,
      weight,
      height,
      gender,
      name,
      waist,
      imageBase,
      nickname,
      stylesArray,
      phone,
    });
    console.log(result);
    yield put({ type: POST_REGISTER_REQUESTING_SUCCESS, payload: { result } });
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
