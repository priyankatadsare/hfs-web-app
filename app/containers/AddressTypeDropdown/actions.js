/*
 *
 * AddressTypeDropdown actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MASTER_DATA,
  GET_MASTER_DATA_ERROR,
  GET_MASTER_DATA_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMasterData(payload) {
  return {
    type: GET_MASTER_DATA,
    payload,
  };
}
export function getMasterDataSuccess(response) {
  return {
    type: GET_MASTER_DATA_SUCCESS,
    response,
  };
}
export function getMasterDataError(error) {
  return {
    type: GET_MASTER_DATA_ERROR,
    error,
  };
}
