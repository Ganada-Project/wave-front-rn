/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';

const selectFavStyle = (state) => state.get('favScreenReducer');
const makeSelectStyles = () => createSelector(selectFavStyle, (favStyle) => favStyle.get('styles'));
const makeSelectStylesLoading = () => createSelector(selectFavStyle, (favStyle) => favStyle.get('stylesLoading'));

export { makeSelectStyles, makeSelectStylesLoading };
