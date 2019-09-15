/**
 * SampleScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSizeDetail = (state) => state.get('sizeDetail', initialState);
const makeSelectSizeDetail = () => createSelector(
  selectSizeDetail,
  (sizeDetailState) => sizeDetailState.get('sizeDetail'),
);

const makeSelectSizeDetailLoading = () => createSelector(
  selectSizeDetail,
  (sizeDetailState) => sizeDetailState.get('sizeDetailLoading'),
);

export { makeSelectSizeDetail, makeSelectSizeDetailLoading };
