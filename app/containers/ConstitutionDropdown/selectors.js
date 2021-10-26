import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the constitutionDropdown state domain
 */

const selectConstitutionDropdownDomain = state =>
  state.constitutionDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConstitutionDropdown
 */

const makeSelectConstitutionDropdown = () =>
  createSelector(
    selectConstitutionDropdownDomain,
    substate => substate,
  );

export default makeSelectConstitutionDropdown;
export { selectConstitutionDropdownDomain };
