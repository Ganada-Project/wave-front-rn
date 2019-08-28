/*
 * PhoneVerify Actions
 *
 */

import {
  VERIFY_PHONE_NUMBER,
  CHECK_PHONE_NUMBER_REQUEST,
  ON_CHANGE_USER_VERIFY_NUMBER,
} from './constants';

/**
 * @param  {number} number phone number
 */
export function verifyPhoneNumberAction({ number }) {
  return {
    type: VERIFY_PHONE_NUMBER,
    payload: { number },
  };
}

export function checkPhoneNumberAction({ number }) {
  return {
    type: CHECK_PHONE_NUMBER_REQUEST,
    number,
  };
}

export function onChangeUserVerifyNumberAction({ number }) {
  return {
    type: ON_CHANGE_USER_VERIFY_NUMBER,
    number,
  };
}
