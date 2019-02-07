/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBrandRecommend = (state) => state.get('brandRecommend', initialState);
const makeSelectBrands = () => createSelector(
  selectBrandRecommend,
  (brandRecommend) => brandRecommend.get('brands'),
);
const makeSelectRecommendLoading = () => createSelector(
  selectBrandRecommend,
  (brandRecommend) => brandRecommend.get('recommendLoading'),
);

export { makeSelectBrands, makeSelectRecommendLoading };
