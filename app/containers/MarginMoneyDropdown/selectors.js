import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the MarginMoneyDropdown state domain
 */

const selectMarginMoneyDropdownDomain = state =>
  state.MarginMoneyDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MarginMoneyDropdown
 */

const makeSelectMarginMoneyDropdown = () =>
  createSelector(
    selectMarginMoneyDropdownDomain,
    substate => substate,
  );

export default makeSelectMarginMoneyDropdown;
export { selectMarginMoneyDropdownDomain };
