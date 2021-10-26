/*
 *
 * BorrowerDetails actions
 *
 */

import {
  CREATE_NEW_APPLICATION,
  CREATE_NEW_APPLICATION_ERROR,
  CREATE_NEW_APPLICATION_SUCCESS,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createApplication(payload) {
  return {
    type: CREATE_NEW_APPLICATION,
    payload,
  };
}
export function createApplicationSuccess(response) {
  return {
    type: CREATE_NEW_APPLICATION_SUCCESS,
    response,
  };
}
export function createApplicationError(error) {
  return {
    type: CREATE_NEW_APPLICATION_ERROR,
    error,
  };
}
