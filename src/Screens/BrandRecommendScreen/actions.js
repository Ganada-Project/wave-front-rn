/*
 * Default Actions
 *
 */

import { GET_BRAND_RECOMMEND_REQUEST } from './constants';

export function getBrandRecommendAction({ stylesArray }) {
  return {
    type: GET_BRAND_RECOMMEND_REQUEST,
    stylesArray,
  };
}
