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
  GET_ITEMS_REQUEST,
  GET_ITEMS_FAIL,
  GET_ITEMS_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  sizeCardsLoading: false,
  sizeCards: [],
  selectedSizeCard: {
    id: null,
    name: '',
  },
  items: [],
  itemsLoading: false,
  sizeCardError: null,
  itemError: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIZE_CARDS_REQUEST:
      return state.set('sizeCardsLoading', true);
    case GET_SIZE_CARDS_SUCCESS:
      return state
        .set('sizeCardLoading', false)
        .set('sizeCards', List(action.cards))
        .set('selectedSizeCard', fromJS(action.selectedSizeCard));
    case GET_SIZE_CARDS_FAIL:
      return state
        .set('sizeCardLoading', false)
        .set('sizeCardError', action.error);
    case SET_SIZE_CARD_SUCCESS:
      return state.set('selectedSizeCard', fromJS(action.sizeCard));
    case GET_ITEMS_REQUEST:
      return state.set('itemsLoading', true);
    case GET_ITEMS_SUCCESS:
      return state.set('itemsLoading', false).set('items', List(action.items));
    case GET_ITEMS_FAIL:
      return state.set('itemsLoading', false).set('itemError', action.error);

    default:
      return state;
  }
}

export default homeReducer;
