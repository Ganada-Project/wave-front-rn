/*
 * Default Actions
 *
 */

import { TRY_SIGN_OUT, FETCH_USER_REQUESTING } from '../App/constants';

export function trySignOutAction({ componentId }) {
  return {
    type: TRY_SIGN_OUT,
    componentId,
  };
}

export function fetchUserAction() {
  return {
    type: FETCH_USER_REQUESTING,
  };
}
