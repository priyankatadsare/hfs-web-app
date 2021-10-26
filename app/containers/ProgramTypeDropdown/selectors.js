import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ProgramTypeDropdown state domain
 */

const selectProgramTypeDropdownDomain = state =>
  state.ProgramTypeDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProgramTypeDropdown
 */

const makeSelectProgramTypeDropdown = () =>
  createSelector(
    selectProgramTypeDropdownDomain,
    substate => substate,
  );

export default makeSelectProgramTypeDropdown;
export { selectProgramTypeDropdownDomain };
