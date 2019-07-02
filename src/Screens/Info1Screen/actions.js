/*
 * RegisterName Actions
 *
 */

import { CHECK_NICKNAME_REQUEST } from './constants';

export function checkNicknameAction({ nickname }) {
  return {
    type: CHECK_NICKNAME_REQUEST,
    nickname,
  };
}
