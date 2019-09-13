import {
  call, put, takeLatest, all, take,
} from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import {
  GET_SIZE_CARDS_FAIL,
  GET_SIZE_CARDS_REQUEST,
  GET_SIZE_CARDS_SUCCESS,
  SET_SIZE_CARD_REQUEST,
  SET_SIZE_CARD_SUCCESS,
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

function* setSizeCardSaga(action) {
  const { sizeCard, componentId } = action;
  console.log(sizeCard);
  console.log(componentId);
  yield put({
    type: SET_SIZE_CARD_SUCCESS,
    sizeCard,
  });
  yield Navigation.dismissModal(componentId);
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_SIZE_CARDS_REQUEST, getSizeCardsSaga),
    takeLatest(SET_SIZE_CARD_REQUEST, setSizeCardSaga),
  ]);
}
