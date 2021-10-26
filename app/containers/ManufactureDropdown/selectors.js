import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manufactureDropdown state domain
 */

const selectManufactureDropdownDomain = state =>
  state.manufactureDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManufactureDropdown
 */

const makeSelectManufactureDropdown = () =>
  createSelector(
    selectManufactureDropdownDomain,
    substate => substate,
  );

export default makeSelectManufactureDropdown;
export { selectManufactureDropdownDomain };
