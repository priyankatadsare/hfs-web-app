import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the guarantorPage state domain
 */

const selectGuarantorPageDomain = state => state.guarantorPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GuarantorPage
 */

const makeSelectGuarantorPage = () =>
  createSelector(
    selectGuarantorPageDomain,
    substate => substate,
  );

export default makeSelectGuarantorPage;
export { selectGuarantorPageDomain };
