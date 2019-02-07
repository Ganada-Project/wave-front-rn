/*
 * Login Actions
 *
 */

import { LOGIN_REQUESTING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {phone} phone string
 * @param  {password} password string
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function requestLoginAction({ phone, password }) {
  return {
    type: LOGIN_REQUESTING,
    payload: { phone, password },
  };
}
