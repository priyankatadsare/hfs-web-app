/*
 *
 * FilterPopup actions
 *
 */

import { DEFAULT_ACTION, SET_FILTER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setFilter(payload, state) {
  debugger;
  return {
    type: SET_FILTER,
    payload,
    state,
  };
}
