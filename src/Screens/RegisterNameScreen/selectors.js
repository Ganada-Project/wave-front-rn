import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterName = (state) => state.get('registerName', initialState);

const makeSelectChecking = () => createSelector(
  selectRegisterName,
  (registerNameState) => registerNameState.get('checking'),
);

const makeSelectOverlap = () => createSelector(
  selectRegisterName,
  (registerNameState) => registerNameState.get('overlap'),
);

export { makeSelectChecking, makeSelectOverlap };
