/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = (state) => state.get('home', initialState);
const makeSelectSizeCardsLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('sizeCardsLoading'),
);

const makeSelectSizeCards = () => createSelector(
  selectHome,
  (homeState) => homeState.get('sizeCards'),
);

const makeSelectSelectedSizeCard = () => createSelector(
  selectHome,
  (homeState) => homeState.get('selectedSizeCard'),
);

export {
  makeSelectSizeCardsLoading,
  makeSelectSizeCards,
  makeSelectSelectedSizeCard,
};
