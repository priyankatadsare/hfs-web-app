import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentDropdown state domain
 */

const selectDocumentDropdownDomain = state =>
  state.documentDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentDropdown
 */

const makeSelectDocumentDropdown = () =>
  createSelector(
    selectDocumentDropdownDomain,
    substate => substate,
  );

export default makeSelectDocumentDropdown;
export { selectDocumentDropdownDomain };
