import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pincode state domain
 */

const selectPincodeDomain = state => state.pincode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Pincode
 */

const makeSelectPincode = () =>
  createSelector(
    selectPincodeDomain,
    substate => substate,
  );

const makeSelectLocation = () =>
  createSelector(
    selectPincodeDomain,
    substate => substate.location,
  );

export default makeSelectPincode;
export { selectPincodeDomain, makeSelectLocation };
