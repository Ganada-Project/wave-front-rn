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
  const url = `${API_URL}/auth/register`;
  const selectGlobal = (state) => state.get('global');
  const globalRedcuer = yield select(selectGlobal);
  const fcmToken = globalRedcuer.get('fcmToken');
  console.log(fcmToken);
  const {
    password,
    // weight,
    // name,
    gender,
    // height,
    // imageBase,
    nickname,
    phone,
    age,
    // headOffset,
    // footOffset,
    // leftNeckOffset,
    // leftShulderOffset,
    // leftElbowOffset,
    // leftHandOffset,
    // rightNeckOffset,
    // rightShulderOffset,
    // rightElbowOffset,
    // rightHandOffset,
    // leftChestOffset,
    // leftWaistOffset,
    // leftPelvisOffset,
    // rightChestOffset,
    // rightWaistOffset,
    // rightPelvisOffset,
    // leftThighOffset,
    // leftAnkleOffset,
    // rightThighOffset,
    // rightAnkleOffset,
  } = action.payload;
  const payload = {
    username: nickname,
    password,
    // name,
    phone,
    gender,
    address: '',
    // base64: imageBase,
    // weight,
    // height,
    // foot: '',
    fcm_token: fcmToken,
    age,
    // profile_img_url:
    //   'https://s3.ap-northeast-2.amazonaws.com/wave-bucket-seoul/user+(1).svg',
    // body_points: [
    //   { ...headOffset },
    //   { ...footOffset },
    //   { ...leftNeckOffset },
    //   { ...leftShulderOffset },
    //   { ...leftElbowOffset },
    //   { ...leftHandOffset },
    //   { ...rightNeckOffset },
    //   { ...rightShulderOffset },
    //   { ...rightElbowOffset },
    //   { ...rightHandOffset },
    //   { ...leftChestOffset },
    //   { ...leftWaistOffset },
    //   { ...leftPelvisOffset },
    //   { ...rightChestOffset },
    //   { ...rightWaistOffset },
    //   { ...rightPelvisOffset },
    //   { ...leftThighOffset },
    //   { ...leftAnkleOffset },
    //   { ...rightThighOffset },
    //   { ...rightAnkleOffset },
    // ],
  };
  try {
    const result = yield call(postRequest, { url, payload });
    yield put({ type: SIGN_UP_SUCCESS, payload: { result } });
    yield AsyncStorage.setItem('wave.idToken', result.token);
    yield fetchUserFlow({ token: result.token });
    // yield Navigation.push()
  } catch (error) {
    console.log(error);
    yield put({ type: SIGN_UP_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(CHECK_NICKNAME_REQUEST, checkNicknameSaga)]);
}
