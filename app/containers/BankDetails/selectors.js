import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bankDetails state domain
 */

const selectBankDetailsDomain = state => state.bankDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BankDetails
 */

const makeSelectBankDetails = () =>
  createSelector(
    selectBankDetailsDomain,
    substate => substate,
  );

export default makeSelectBankDetails;
export { selectBankDetailsDomain };
