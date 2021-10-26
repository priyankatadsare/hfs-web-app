import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the WorkExperienceDropdownDropdown state domain
 */

const selectWorkExperienceDropdownDropdownDomain = state =>
  state.WorkExperienceDropdownDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WorkExperienceDropdownDropdown
 */

const makeSelectWorkExperienceDropdownDropdown = () =>
  createSelector(
    selectWorkExperienceDropdownDropdownDomain,
    substate => substate,
  );

export default makeSelectWorkExperienceDropdownDropdown;
export { selectWorkExperienceDropdownDropdownDomain };
