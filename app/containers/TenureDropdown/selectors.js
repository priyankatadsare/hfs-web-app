import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tenureDropdown state domain
 */

const selectTenureDropdownDomain = state =>
  state.tenureDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TenureDropdown
 */

const makeSelectTenureDropdown = () =>
  createSelector(
    selectTenureDropdownDomain,
    substate => substate,
  );

export default makeSelectTenureDropdown;
export { selectTenureDropdownDomain };
