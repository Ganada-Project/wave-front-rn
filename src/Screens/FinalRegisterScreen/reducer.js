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
  POST_REGISTER_REQUESTING,
  POST_REGISTER_REQUESTING_FAIL,
  POST_REGISTER_REQUESTING_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  registerLoading: false,
});

function finalRegisterReducer(state = initialState, action) {
  switch (action.type) {
    case POST_REGISTER_REQUESTING:
      return state.set('registerLoading', true);
    case POST_REGISTER_REQUESTING_SUCCESS:
      return state.set('registerLoading', false);
    case POST_REGISTER_REQUESTING_FAIL:
      return state.set('registerLoading', false);

    default:
      return state;
  }
}

export default finalRegisterReducer;
