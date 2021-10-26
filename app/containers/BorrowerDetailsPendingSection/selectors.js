import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the borrowerDetailsPendingSection state domain
 */

const selectBorrowerDetailsPendingSectionDomain = state =>
  state.borrowerDetailsPendingSection || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BorrowerDetailsPendingSection
 */

const makeSelectBorrowerDetailsPendingSection = () =>
  createSelector(
    selectBorrowerDetailsPendingSectionDomain,
    substate => substate,
  );

export default makeSelectBorrowerDetailsPendingSection;
export { selectBorrowerDetailsPendingSectionDomain };
