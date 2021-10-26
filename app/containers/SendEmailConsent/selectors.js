import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendEmailConsent state domain
 */

const selectSendEmailConsentDomain = state =>
  state.sendEmailConsent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SendEmailConsent
 */

const makeSelectSendEmailConsent = () =>
  createSelector(
    selectSendEmailConsentDomain,
    substate => substate,
  );

export default makeSelectSendEmailConsent;
export { selectSendEmailConsentDomain };
