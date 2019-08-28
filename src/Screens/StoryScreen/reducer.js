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
  GET_STYLES_REQUESTING,
  GET_STYLES_REQUESTING_FAIL,
  GET_STYLES_REQUESTING_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  styles: []
});

function storyReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case GET_STYLES_REQUESTING:
      return state
        .set('loading', true)
        .set('successful', false)
        .set('errors', []);
    case GET_STYLES_REQUESTING_SUCCESS:
      return state
        .set('styles', List(action.result))

    case GET_STYLES_REQUESTING_FAIL:
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

export default storyReducer;
