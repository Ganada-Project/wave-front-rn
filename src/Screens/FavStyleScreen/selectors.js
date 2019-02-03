/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFavStyle = (state) => state.get('favStyle', initialState);
const makeSelectStyles = () => createSelector(
  selectFavStyle,
  (favStyle) => favStyle.get('styles'),
);
const makeSelectStylesLoading = () => createSelector(
  selectFavStyle,
  (favStyle) => favStyle.get('stylesLoading'),
);

export { makeSelectStyles, makeSelectStylesLoading };
