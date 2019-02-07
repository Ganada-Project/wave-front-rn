/*
 * Default Actions
 *
 */

import { TRY_SIGN_OUT } from '../App/constants';

export function trySignOutAction({ componentId }) {
  return {
    type: TRY_SIGN_OUT,
    componentId,
  };
}
