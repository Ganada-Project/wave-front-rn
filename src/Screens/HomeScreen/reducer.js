/*
 * DefaultScreenReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, List } from 'immutable';

import {
  GET_SIZE_CARDS_FAIL,
  GET_SIZE_CARDS_REQUEST,
  GET_SIZE_CARDS_SUCCESS,
  SET_SIZE_CARD_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  sizeCardsLoading: false,
  sizeCards: [],
  selectedSizeCard: {
    name: '',
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIZE_CARDS_REQUEST:
      return state.set('sizeCardsLoading', true);
    case GET_SIZE_CARDS_SUCCESS:
      return state
        .set('sizeCardLoading', false)
        .set('sizeCards', List(action.cards))
        .set('selectedSizeCard', action.selectedSizeCard);
    case GET_SIZE_CARDS_FAIL:
      return state.set('sizeCardLoading', false);
    case SET_SIZE_CARD_SUCCESS:
      return state.set('selectedSizeCard', action.sizeCard);

    default:
      return state;
  }
}

export default homeReducer;
