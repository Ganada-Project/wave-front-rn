/*
 * Login Actions
 *
 */

import { LOGIN_REQUESTING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {email} email email
 * @param  {password} password password
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function requestLoginAction({ email, password }) {
  return {
    type: LOGIN_REQUESTING,
    payload: { email, password },
  };
}
