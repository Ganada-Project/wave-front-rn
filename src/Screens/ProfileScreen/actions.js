/*
 * Default Actions
 *
 */

import { TRY_SIGN_OUT } from './constants';

export function trySignOutAction({ componentId }) {
  return {
    type: TRY_SIGN_OUT,
    componentId,
  };
}
