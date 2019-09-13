import { GET_SIZE_CARDS_REQUEST, SET_SIZE_CARD_REQUEST } from './constants';

/**
 * Home Actions
 */

export function getSizeCardRequestAction() {
  return {
    type: GET_SIZE_CARDS_REQUEST,
  };
}

export function setSizeCardRequestAction({ sizeCard, componentId }) {
  return {
    type: SET_SIZE_CARD_REQUEST,
    sizeCard,
    componentId,
  };
}
