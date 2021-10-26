/*
 *
 * SendEmailConsent actions
 *
 */

import {
  DEFAULT_ACTION,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendEmail(payload) {
  return {
    type: SEND_EMAIL,
    payload,
  };
}
export function sendEmailSuccess(response) {
  return {
    type: SEND_EMAIL_SUCCESS,
    response,
  };
}
export function sendEmailError(error) {
  return {
    type: SEND_EMAIL_ERROR,
    error,
  };
}
