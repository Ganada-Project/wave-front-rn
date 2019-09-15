/**
 * SampleScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSample = (state) => state.get('sample', initialState);
const makeSelectSample = () => createSelector(
  selectSample,
  (sampleState) => sampleState.get('sample'),
);

export { makeSelectSample };
