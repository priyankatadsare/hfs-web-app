import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the filterPopup state domain
 */

const selectFilterPopupDomain = state => state.filterPopup || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FilterPopup
 */

const makeSelectFilterPopup = () =>
  createSelector(
    selectFilterPopupDomain,
    substate => substate,
  );

export default makeSelectFilterPopup;
export { selectFilterPopupDomain };
