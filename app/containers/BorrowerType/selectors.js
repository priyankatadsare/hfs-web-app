import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the borrowerType state domain
 */

const selectBorrowerTypeDomain = state => state.borrowerType || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BorrowerType
 */

const makeSelectBorrowerType = () =>
  createSelector(
    selectBorrowerTypeDomain,
    substate => substate,
  );

export default makeSelectBorrowerType;
export { selectBorrowerTypeDomain };
