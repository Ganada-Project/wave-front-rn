/**
 * Gets the repositories of the user from Github
 */
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import { put, takeLatest, all } from 'redux-saga/effects';
import {
  TRY_SIGN_OUT,
  TRY_SIGN_OUT_FAIL,
  TRY_SIGN_OUT_SUCCESS,
} from '../App/constants';

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('wave.idToken');
  } catch (error) {
    // Error retrieving data
  }
};

function* trySignOutSaga() {
  try {
    yield put({ type: TRY_SIGN_OUT_SUCCESS });
    yield removeToken();
    yield Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'wave.welcome',
                options: {
                  statusBar: {
                    style: 'light',
                  },
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
  } catch (error) {
    yield put({ type: TRY_SIGN_OUT_FAIL });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(TRY_SIGN_OUT, trySignOutSaga)]);
}
