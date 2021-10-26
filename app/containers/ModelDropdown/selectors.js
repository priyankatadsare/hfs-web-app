import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the modelDropdown state domain
 */

const selectModelDropdownDomain = state => state.modelDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ModelDropdown
 */

const makeSelectModelDropdown = () =>
  createSelector(
    selectModelDropdownDomain,
    substate => substate,
  );

export default makeSelectModelDropdown;
export { selectModelDropdownDomain };
