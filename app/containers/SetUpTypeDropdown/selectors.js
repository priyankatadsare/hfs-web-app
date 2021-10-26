import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the SetUpTypeDropdownDropdown state domain
 */

const selectSetUpTypeDropdownDropdownDomain = state =>
  state.SetUpTypeDropdownDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SetUpTypeDropdownDropdown
 */

const makeSelectSetUpTypeDropdownDropdown = () =>
  createSelector(
    selectSetUpTypeDropdownDropdownDomain,
    substate => substate,
  );

export default makeSelectSetUpTypeDropdownDropdown;
export { selectSetUpTypeDropdownDropdownDomain };
