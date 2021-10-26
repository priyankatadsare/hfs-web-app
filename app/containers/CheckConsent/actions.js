/*
 *
 * CheckConsent actions
 *
 */

import {
  CHECK_CONSENT,
  CHECK_CONSENT_ERROR,
  CHECK_CONSENT_SUCCESS,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getConsent(payload) {
  return {
    type: CHECK_CONSENT,
    payload,
  };
}
export function checkConsentSuccess(response) {
  return {
    type: CHECK_CONSENT_SUCCESS,
    response,
  };
}
export function checkConsentError(error) {
  return {
    type: CHECK_CONSENT_ERROR,
    error,
  };
}
