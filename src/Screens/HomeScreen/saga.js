import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import {
  GET_SIZE_CARDS_FAIL,
  GET_SIZE_CARDS_REQUEST,
  GET_SIZE_CARDS_SUCCESS,
} from './constants';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';

function* getSizeCardsSaga() {
  const url = `${API_URL}/card`;
  try {
    let selectedSizeCard;
    const result = yield call(getRequest, { url });
    if (result.cards.length === 0) {
      selectedSizeCard = { name: '사이즈카드 등록' };
    } else {
      selectedSizeCard = result.cards[0]; //eslint-disable-line
    }
    yield put({
      type: GET_SIZE_CARDS_SUCCESS,
      cards: result.cards,
      selectedSizeCard,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_SIZE_CARDS_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_SIZE_CARDS_REQUEST, getSizeCardsSaga)]);
}
