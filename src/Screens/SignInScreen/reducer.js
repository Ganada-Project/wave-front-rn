/*
 * SignInScreenReducer
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

import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  email: '',
  loading: false,
  successful: true,
  messages: [],
  errors: [],
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case LOGIN_REQUESTING:
      return state
        .set('loading', true)
        .set('successful', false)
        .set('messages', [{ body: 'Logging in...', time: new Date() }])
        .set('errors', []);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('successful', true)
        .set('messages', [])
        .set('errors', []);
    case LOGIN_ERROR:
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

export default loginReducer;
