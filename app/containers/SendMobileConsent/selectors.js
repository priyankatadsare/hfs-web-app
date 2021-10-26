import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendMobileConsent state domain
 */

const selectSendMobileConsentDomain = state =>
  state.sendMobileConsent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SendMobileConsent
 */

const makeSelectSendMobileConsent = () =>
  createSelector(
    selectSendMobileConsentDomain,
    substate => substate,
  );

export default makeSelectSendMobileConsent;
export { selectSendMobileConsentDomain };
