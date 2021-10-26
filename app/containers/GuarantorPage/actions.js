/*
 *
 * GuarantorPage actions
 *
 */

import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FETCH_QUALIFICATION,
  FETCH_QUALIFICATION_SUCCESS,
  FETCH_QUALIFICATION_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from './constants';

export function fetchUser(cuid) {
  return {
    type: LOAD_USER,
    cuid,
  };
}

export function userFetched(response) {
  return {
    type: LOAD_USER_SUCCESS,
    response,
  };
}

export function fetchUserFailed(error) {
  return {
    type: LOAD_USER_FAILURE,
    error,
  };
}

export function fetchQualification() {
  return {
    type: FETCH_QUALIFICATION,
  };
}

export function fetchQualificationSuccess(response) {
  return {
    type: FETCH_QUALIFICATION_SUCCESS,
    response,
  };
}

export function fetchQualificationError(error) {
  return {
    type: FETCH_QUALIFICATION_FAILURE,
    error,
  };
}

export function updateProfileForBoth(payload) {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
}

export function updateProfileForBothSuccess(response) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    response,
  };
}
