import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';

import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import { fetchUserFlow } from '../App/saga';

import {
  CHECK_NICKNAME_FAIL,
  CHECK_NICKNAME_REQUEST,
  CHECK_NICKNAME_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from './constants';
import { API_URL } from '../../constants';
import { getRequest, postRequest } from '../../utils/request';

function* checkNicknameSaga(action) {
  const { nickname } = action;
  const url = `${API_URL}/auth/username?username=${nickname}`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: CHECK_NICKNAME_SUCCESS, overlap: result.overlap });
  } catch (error) {
    // error? send it to redux
    yield put({ type: CHECK_NICKNAME_FAIL, error });
  }
}

function* registerUserSaga(action) {
  const { signUpObj } = action;
  const url = `${API_URL}/auth/register`;
  const selectGlobal = (state) => state.get('global');
  const globalRedcuer = yield select(selectGlobal);
  const fcmToken = globalRedcuer.get('fcmToken');
  const payload = {
    ...signUpObj,
    fcm: fcmToken,
  };
  try {
    const result = yield call(postRequest, { url, payload });
    yield put({ type: SIGN_UP_SUCCESS, payload: { result } });
    console.log(result);
    yield AsyncStorage.setItem('wave.idToken', result.token);
    // yield fetchUserFlow({ token: result.token });
    yield Navigation.push(signUpObj.componentId, {
      component: {
        name: 'wave.home',
      },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SIGN_UP_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(CHECK_NICKNAME_REQUEST, checkNicknameSaga),
    takeLatest(SIGN_UP_REQUEST, registerUserSaga),
  ]);
}
