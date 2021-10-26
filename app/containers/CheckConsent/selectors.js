import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkConsent state domain
 */

const selectCheckConsentDomain = state => state.checkConsent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CheckConsent
 */

const makeSelectCheckConsent = () =>
  createSelector(
    selectCheckConsentDomain,
    substate => substate,
  );

export default makeSelectCheckConsent;
export { selectCheckConsentDomain };
