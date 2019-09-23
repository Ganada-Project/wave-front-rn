import { Navigation } from 'react-native-navigation';
import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import {
  GET_SIZE_DETAIL_FAIL,
  GET_SIZE_DETAIL_REQUEST,
  GET_SIZE_DETAIL_SUCCESS,
  sizeDetail,
} from './constants';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../constants';

function* getSizeDetailSaga(action) {
  try {
    const url = `${API_URL}/card/size?card=${action.sizeCardId}`;
    const sizeCardDetail = yield call(getRequest, { url });
    const mergedSizeCardDetail = sizeDetail.map((detail) => ({
      ...detail,
      measurement: sizeCardDetail.size[detail.key],
    }));
    yield put({
      type: GET_SIZE_DETAIL_SUCCESS,
      sizeCard: mergedSizeCardDetail,
    });
  } catch (error) {
    yield put({ type: GET_SIZE_DETAIL_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_SIZE_DETAIL_REQUEST, getSizeDetailSaga)]);
}
