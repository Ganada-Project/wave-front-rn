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
  VERIFY_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER_FAIL,
  VERIFY_PHONE_NUMBER_SUCCESS,
  CHECK_PHONE_NUMBER_FAIL,
  CHECK_PHONE_NUMBER_REQUEST,
  CHECK_PHONE_NUMBER_SUCCESS,
  ON_CHANGE_USER_VERIFY_NUMBER,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  verifyLoading: false,
  verifyNumber: '0',
  userVerifyNumber: null,
  checking: false,
  overlap: false,
});

function phoneVerificationReducer(state = initialState, action) {
  switch (action.type) {
    // start login
    case VERIFY_PHONE_NUMBER:
      return state.set('verifyLoading', true);
    case VERIFY_PHONE_NUMBER_SUCCESS:
      return state
        .set('verifyLoading', false)
        .set('verifyNumber', action.payload.result.verification_code);

    case VERIFY_PHONE_NUMBER_FAIL:
      return state.set('verifyLoading', false).set('errors', [
        {
          body: action.error.toString(),
          time: new Date(),
        },
      ]);
    case CHECK_PHONE_NUMBER_REQUEST:
      return state.set('checking', true);
    case CHECK_PHONE_NUMBER_SUCCESS:
      return state.set('checking', false).set('overlap', action.overlap);
    case CHECK_PHONE_NUMBER_FAIL:
      return state.set('checking', false);

    case ON_CHANGE_USER_VERIFY_NUMBER:
      return state.set('userVerifyNumber', action.number);

    default:
      return state;
  }
}

export default phoneVerificationReducer;
