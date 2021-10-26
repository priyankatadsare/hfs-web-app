import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressInputModal state domain
 */

const selectAddressInputModalDomain = state =>
  state.addressInputModal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressInputModal
 */

const makeSelectAddressInputModal = () =>
  createSelector(
    selectAddressInputModalDomain,
    substate => substate,
  );

export default makeSelectAddressInputModal;
export { selectAddressInputModalDomain };
