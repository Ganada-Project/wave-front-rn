/**
 * SignInScreen selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStory = (state) => state.get('story', initialState);
const makeSelectStyles = () => createSelector(selectStory, (storyState) => storyState.get('styles'));

export { makeSelectStyles };
