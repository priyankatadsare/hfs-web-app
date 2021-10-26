import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessProfileDropdown state domain
 */

const selectBusinessTypeDropdownDomain = state =>
  state.businessTypeDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessProfileDropdown
 */

const makeSelectBusinessTypeDropdown = () =>
  createSelector(
    selectBusinessTypeDropdownDomain,
    substate => substate,
  );

export default makeSelectBusinessTypeDropdown;
export { selectBusinessTypeDropdownDomain };
