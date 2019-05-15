import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

import {
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_FAIL,
  FETCH_USER_REQUESTING_SUCCESS,
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
  const url = `${API_URL}/user/me`;
  const idToken = yield getUserToken() || token;
  const test = yield getUserToken();
  console.log("App/saga");
  console.log(test);
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
    console.log(idToken);
    try {
      user = yield call(getRequest, { url });
      console.log('App/Saga/user');
      console.log(user);
      
      yield put({
        type: FETCH_USER_REQUESTING_SUCCESS,
        payload: { user, idToken },
      });
      yield startTabScreens();
      console.log(this.props.userData.user.toJS());
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
