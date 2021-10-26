import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loanApplications state domain
 */

const selectLoanApplicationsDomain = state =>
  state.loanApplications || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoanApplications
 */

const makeSelectLoanApplications = () =>
  createSelector(
    selectLoanApplicationsDomain,
    substate => substate,
  );

export default makeSelectLoanApplications;
export { selectLoanApplicationsDomain };
