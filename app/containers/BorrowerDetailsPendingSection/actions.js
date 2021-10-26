/*
 *
 * BorrowerDetailsPendingSection actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_ADDRESS_LIST,
  UPDATE_APP,
  UPDATE_APP_ERROR,
  UPDATE_APP_SUCCEESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateApplication(payload) {
  return {
    type: UPDATE_APP,
    payload,
  };
}
export function updateApplicationSuccess(response) {
  return {
    type: UPDATE_APP_SUCCEESS,
    response,
  };
}
export function updateApplicationError(error) {
  return {
    type: UPDATE_APP_ERROR,
    error,
  };
}
export function updateAddressList(payload) {
  return {
    type: UPDATE_ADDRESS_LIST,
    payload,
  };
}
