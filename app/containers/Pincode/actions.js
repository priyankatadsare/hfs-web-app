/*
 *
 * Pincode actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LOCATION,
  GET_LOCATION_ERROR,
  GET_LOCATION_SUCCESS,
  SET_LOADING,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getLocation(pincode) {
  return {
    type: GET_LOCATION,
    payload: pincode,
  };
}

export function getLocationSuccess(data) {
  return {
    type: GET_LOCATION_SUCCESS,
    payload: data,
  };
}

export function getLocationError(error) {
  return {
    type: GET_LOCATION_ERROR,
    payload: error,
  };
}

export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data,
  };
}
