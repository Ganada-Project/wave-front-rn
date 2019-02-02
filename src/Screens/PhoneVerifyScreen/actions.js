/*
 * Default Actions
 *
 */

import { VERIFY_PHONE_NUMBER } from './constants';

/**
 * @param  {number} number phone number
 */
export function verifyPhoneNumberAction({ number }) {
  return {
    type: VERIFY_PHONE_NUMBER,
    payload: { number },
  };
}
