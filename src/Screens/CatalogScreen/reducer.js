/*
 * CatalogReducer
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
  GET_ITEMS_REQUESTING,
  GET_ITEMS_FAIL,
  GET_ITEMS_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  brands: [],
});

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_REQUESTING:
      return state.set('loading', true);
    case GET_ITEMS_SUCCESS:
      return state.set('loading', false).set('brands', List(action.brands));
    case GET_ITEMS_FAIL:
      return state.set('loading', false).set('error', action.error);

    default:
      return state;
  }
}

export default catalogReducer;
