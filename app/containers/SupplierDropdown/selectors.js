import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the supplierDropdown state domain
 */

const selectSupplierDropdownDomain = state =>
  state.supplierDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SupplierDropdown
 */

const makeSelectSupplierDropdown = () =>
  createSelector(
    selectSupplierDropdownDomain,
    substate => substate,
  );

export default makeSelectSupplierDropdown;
export { selectSupplierDropdownDomain };
