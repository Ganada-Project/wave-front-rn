import AsyncStorage from '@react-native-community/async-storage';

import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  POST_REGISTER_REQUESTING,
  POST_REGISTER_REQUESTING_FAIL,
  POST_REGISTER_REQUESTING_SUCCESS,
} from './constants';
import { FETCH_USER_REQUESTING } from '../App/constants';
import { fetchUserFlow } from '../App/saga';
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
    imageBase,
    nickname,
    phone,
    age,
    headOffset,
    footOffset,
    leftNeckOffset,
    leftShulderOffset,
    leftElbowOffset,
    leftHandOffset,
    rightNeckOffset,
    rightShulderOffset,
    rightElbowOffset,
    rightHandOffset,
    leftChestOffset,
    leftWaistOffset,
    leftPelvisOffset,
    rightChestOffset,
    rightWaistOffset,
    rightPelvisOffset,
    leftThighOffset,
    leftAnkleOffset,
    rightThighOffset,
    rightAnkleOffset,
  } = action.payload;
  const payload = {
    username: nickname,
    password,
    name,
    phone,
    gender,
    address: '',
    base64: imageBase,
    weight,
    height,
    foot: '',
    age,
    profile_img_url:
      'https://s3.ap-northeast-2.amazonaws.com/wave-bucket-seoul/user+(1).svg',
    body_points: [
      { ...headOffset },
      { ...footOffset },
      { ...leftNeckOffset },
      { ...leftShulderOffset },
      { ...leftElbowOffset },
      { ...leftHandOffset },
      { ...rightNeckOffset },
      { ...rightShulderOffset },
      { ...rightElbowOffset },
      { ...rightHandOffset },
      { ...leftChestOffset },
      { ...leftWaistOffset },
      { ...leftPelvisOffset },
      { ...rightChestOffset },
      { ...rightWaistOffset },
      { ...rightPelvisOffset },
      { ...leftThighOffset },
      { ...leftAnkleOffset },
      { ...rightThighOffset },
      { ...rightAnkleOffset },
    ],
  };
  try {
    console.log(payload);
    const result = yield call(postRequest, { url, payload });
    yield put({ type: POST_REGISTER_REQUESTING_SUCCESS, payload: { result } });
    yield AsyncStorage.setItem('wave.idToken', result.token);
    yield fetchUserFlow({ token: result.token });
    yield startTabScreens();
  } catch (error) {
    console.log(error);
    yield put({ type: POST_REGISTER_REQUESTING_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(POST_REGISTER_REQUESTING, registerUserSaga)]);
}
