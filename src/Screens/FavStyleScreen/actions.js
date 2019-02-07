/*
 * Default Actions
 *
 */

import { FETCH_STYLES_REQUESTING } from './constants';

export function getAllStylesAction() {
  return {
    type: FETCH_STYLES_REQUESTING,
  };
}
