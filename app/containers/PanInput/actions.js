/*
 *
 * PanInput actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PAN,
  FETCH_PAN_ERROR,
  FETCH_PAN_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchPan(payload) {
  return {
    type: FETCH_PAN,
    payload,
  };
}
export function fetchPanSuccess(response) {
  return {
    type: FETCH_PAN_SUCCESS,
    response,
  };
}
export function fetchPanError(error) {
  return {
    type: FETCH_PAN_ERROR,
    error,
  };
}
