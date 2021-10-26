import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessProfileDropdown state domain
 */

const selectBusinessProfileDropdownDomain = state =>
  state.businessProfileDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessProfileDropdown
 */

const makeSelectBusinessProfileDropdown = () =>
  createSelector(
    selectBusinessProfileDropdownDomain,
    substate => substate,
  );

export default makeSelectBusinessProfileDropdown;
export { selectBusinessProfileDropdownDomain };
