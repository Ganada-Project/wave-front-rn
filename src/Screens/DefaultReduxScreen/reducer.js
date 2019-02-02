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
import { fromJS } from 'immutable';

import {
  FETCH_DEFAULT_REQUESTING,
  FETCH_DEFAULT_REQUESTING_SUCCESS,
  FETCH_DEFAULT_REQUESTING_FAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({});

function defaultReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case FETCH_DEFAULT_REQUESTING:
      return state
        .set('loading', true)
        .set('successful', false)
        .set('errors', []);
    case FETCH_DEFAULT_REQUESTING_SUCCESS:
      return state
        .set('loading', false)
        .set('successful', true)
        .set('messages', [])
        .set('errors', []);
    case FETCH_DEFAULT_REQUESTING_FAIL:
      return state
        .set('loading', false)
        .set('successful', false)
        .set('messages', [])
        .set('errors', [
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]);

    default:
      return state;
  }
}

export default defaultReducer;
