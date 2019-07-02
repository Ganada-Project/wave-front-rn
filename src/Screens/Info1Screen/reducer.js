/*
 * RegsiterNameScreenReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHECK_NICKNAME_FAIL,
  CHECK_NICKNAME_REQUEST,
  CHECK_NICKNAME_SUCCESS,
} from './constants';

// The initial state of the registerName
export const initialState = fromJS({
  checking: false,
  overlap: false,
});

function info1ScreenReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_NICKNAME_REQUEST:
      return state.set('checking', true);
    case CHECK_NICKNAME_SUCCESS:
      return state.set('checking', false).set('overlap', action.overlap);
    case CHECK_NICKNAME_FAIL:
      return state.set('checking', false);
    default:
      return state;
  }
}

export default info1ScreenReducer;
