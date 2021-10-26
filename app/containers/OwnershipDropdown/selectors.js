import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ownershipDropdown state domain
 */

const selectOwnershipDropdownDomain = state =>
  state.ownershipDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OwnershipDropdown
 */

const makeSelectOwnershipDropdown = () =>
  createSelector(
    selectOwnershipDropdownDomain,
    substate => substate,
  );

export default makeSelectOwnershipDropdown;
export { selectOwnershipDropdownDomain };
