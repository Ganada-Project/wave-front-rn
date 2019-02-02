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
  FETCH_STYLES_REQUESTING,
  FETCH_STYLES_REQUESTING_SUCCESS,
  FETCH_STYLES_REQUESTING_FAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  stylesLoading: false,
  styles: [],
  error: null,
});

function favStyleReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case FETCH_STYLES_REQUESTING:
      return state.set('stylesLoading', true);
    case FETCH_STYLES_REQUESTING_SUCCESS:
      return state
        .set('stylesLoading', false)
        .set('styles', fromJS(action.payload.styles));

    case FETCH_STYLES_REQUESTING_FAIL:
      return state.set('stylesLoading', false).set('error', action.error);

    default:
      return state;
  }
}

export default favStyleReducer;
