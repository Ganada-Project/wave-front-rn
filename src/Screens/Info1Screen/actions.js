/*
 * RegisterName Actions
 *
 */

import { CHECK_NICKNAME_REQUEST, SIGN_UP_REQUEST } from './constants';

export function checkNicknameAction({ nickname }) {
  return {
    type: CHECK_NICKNAME_REQUEST,
    nickname,
  };
}

export function signUpRequestAction({ signUpObj }) {
  return {
    type: SIGN_UP_REQUEST,
    signUpObj,
  };
}
