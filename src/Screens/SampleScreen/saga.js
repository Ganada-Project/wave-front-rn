import { Navigation } from 'react-native-navigation';
import { put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_SAMPLE_FAIL,
  GET_SAMPLE_REQUEST,
  GET_SAMPLE_SUCCESS,
} from './constants';

function* sampleSaga() {
  try {
    yield put({ type: GET_SAMPLE_SUCCESS });
  } catch (error) {
    yield put({ type: GET_SAMPLE_FAIL });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_SAMPLE_REQUEST, sampleSaga)]);
}
