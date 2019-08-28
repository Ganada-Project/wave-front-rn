import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCatalog = (state) => state.get('catalog', initialState);

const makeSelectBrands = () => createSelector(
  selectCatalog,
  (catalog) => catalog.get('brands'),
);

export { makeSelectBrands };
