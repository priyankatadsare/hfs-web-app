import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loanDetails state domain
 */

const selectLoanDetailsDomain = state => state.loanDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoanDetails
 */

const makeSelectLoanDetails = () =>
  createSelector(
    selectLoanDetailsDomain,
    substate => substate,
  );

export default makeSelectLoanDetails;
export { selectLoanDetailsDomain };
