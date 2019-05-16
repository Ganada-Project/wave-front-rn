import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

import {
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_FAIL,
  FETCH_USER_REQUESTING_SUCCESS,
  GET_FCM_TOKEN_SUCCESS,
} from './constants';

import { startTabScreens } from '../../index';

const getUserToken = async () => {
  let idToken;
  try {
    idToken = await AsyncStorage.getItem('wave.idToken');
  } catch (error) {
    // Error retrieving data
    idToken = null;
  }
  return idToken;
};

export function* fetchUserFlow({ token }) {
  let user;
  const url = `${API_URL}/user`;
  const idToken = yield getUserToken() || token;
  const fcmToken = yield firebase.messaging().getToken();
  yield put({ type: GET_FCM_TOKEN_SUCCESS, fcmToken });
  if (!idToken || idToken === null || idToken === undefined) {
    user = { result: null };
    yield put({ type: FETCH_USER_REQUESTING_FAIL });
    yield Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'wave.welcome',
                statusBar: {
                  style: 'light',
                },
                options: {
                  topBar: {
                    visible: false,
                  },
                },
              },
            },
          ],
        },
      },
    });
  } else {
    try {
      user = yield call(getRequest, { url });
      yield put({
        type: FETCH_USER_REQUESTING_SUCCESS,
        payload: { user, idToken },
      });
      yield startTabScreens();
    } catch (error) {
      user = { result: null };
      yield put({ type: FETCH_USER_REQUESTING_FAIL, error });
    }
  }
  return user.result;
}

export default function* rootSaga() {
  yield all([takeLatest(FETCH_USER_REQUESTING, fetchUserFlow)]);
}
