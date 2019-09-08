/*
 * AppReducer
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
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_FAIL,
  FETCH_USER_REQUESTING_SUCCESS,
  TRY_SIGN_OUT_SUCCESS,
  GET_FCM_TOKEN_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  idToken: '',
  fcmToken: null,
  userData: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUESTING:
      return state.set('loading', true);
    case FETCH_USER_REQUESTING_SUCCESS:
      return state
        .set('userData', fromJS({ ...action.payload.user }))
        .set('idToken', action.payload.idToken)
        .set('loading', false);
    case GET_FCM_TOKEN_SUCCESS:
      return state.set('fcmToken', action.fcmToken);
    case FETCH_USER_REQUESTING_FAIL:
      return state.set('loading', false).set('error', action.error);
    case TRY_SIGN_OUT_SUCCESS:
      return state.set('userData', null).set('idToken', null);
    default:
      return state;
  }
}

export default appReducer;
