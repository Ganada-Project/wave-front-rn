/*
 * Default Actions
 *
 */

import { GET_ITEMS_REQUEST } from './constants';

export function getItemsAction({ stylesArray }) {
  return {
    type: GET_ITEMS_REQUEST,
    stylesArray,
  };
}
