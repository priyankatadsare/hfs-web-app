import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the borrowerDetails state domain
 */

const selectBorrowerDetailsDomain = state =>
  state.borrowerDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BorrowerDetails
 */

const makeSelectBorrowerDetails = () =>
  createSelector(
    selectBorrowerDetailsDomain,
    substate => substate,
  );

export default makeSelectBorrowerDetails;
export { selectBorrowerDetailsDomain };
