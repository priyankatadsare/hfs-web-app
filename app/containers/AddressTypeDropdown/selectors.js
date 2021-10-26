import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressTypeDropdown state domain
 */

const selectAddressTypeDropdownDomain = state =>
  state.addressTypeDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressTypeDropdown
 */

const makeSelectAddressTypeDropdown = () =>
  createSelector(
    selectAddressTypeDropdownDomain,
    substate => substate,
  );

export default makeSelectAddressTypeDropdown;
export { selectAddressTypeDropdownDomain };
