/*
 *
 * FinalSubmissionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_USER_DECISION,
  SET_USER_DECISION_ERROR,
  SET_USER_DECISION_SUCCESS,
  SET_SUCCESS_FALSE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setUserDecision(payload) {
  return {
    type: SET_USER_DECISION,
    payload,
  };
}
export function setUserDecisionSuccess(response) {
  return {
    type: SET_USER_DECISION_SUCCESS,
    response,
  };
}
export function setUserDecisionError(error) {
  return {
    type: SET_USER_DECISION_ERROR,
    error,
  };
}
export function setSuccessFalse() {
  return {
    type: SET_SUCCESS_FALSE,
  };
}
