/*
 *
 * BusinessProfileDropdown actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_GSTN,
  FETCH_GSTN_FAILED,
  FETCH_GSTN_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchGstn() {
  return {
    type: FETCH_GSTN,
  };
}

export function gstnFetched(response) {
  return {
    type: FETCH_GSTN_SUCCESS,
    response,
  };
}

export function gstnFetchingError(error) {
  return {
    type: FETCH_GSTN_FAILED,
    error,
  };
}
