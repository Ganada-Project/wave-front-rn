import { AsyncStorage, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  take, fork, call, put, takeLatest, all,
} from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

import {
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_FAIL,
  FETCH_USER_REQUESTING_SUCCESS,
  TRY_SIGN_OUT,
  TRY_SIGN_OUT_SUCCESS,
  TRY_SIGN_OUT_FAIL,
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

export function* fetchUserFlow(action) {
  let user;
  const { componentId } = action;
  const url = `${API_URL}/user`;
  const idToken = yield getUserToken();
  if (!idToken) {
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
        payload: { user: user.result[0], idToken },
      });
      yield startTabScreens();
    } catch (error) {
      console.log(error);
      yield put({ type: FETCH_USER_REQUESTING_FAIL });
    }
  }
  return user;
}

// export function* fetchUserWatcher() {
//   while (true) {
//     // eslint-disable-line no-constant-condition
//     const { idToken } = yield take(FETCH_USER_REQUESTING);
//     yield fork(fetchUserFlow, idToken);
//   }
// }

export default function* rootSaga() {
  yield all([takeLatest(FETCH_USER_REQUESTING, fetchUserFlow)]);
}
