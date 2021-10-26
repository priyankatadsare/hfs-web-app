/*
 *
 * BankDetails actions
 *
 */

import {
  FETCH_BANKS,
  FETCH_BANKS_FAILURE,
  FETCH_BANKS_SUCCESS,
  START_PERFIOS,
  START_PERFIOS_SUCCESS,
  START_PERFIOS_ERROR,
  SET_PASSWORD,
  UPDATE_PERFIOS_LIST,
  SET_LOADING,
  GET_PERFIOS_STATUS,
  GET_PERFIOS_STATUS_SUCCESS,
  GET_PERFIOS_STATUS_ERROR,
} from './constants';

export function fetchBanks(term) {
  return {
    type: FETCH_BANKS,
    term,
  };
}

export function banksFetched(data) {
  return {
    type: FETCH_BANKS_SUCCESS,
    data,
  };
}

export function banksFetchingError(error) {
  return {
    type: FETCH_BANKS_FAILURE,
    error,
  };
}

export function startPerfios({ payload, password, appId, fileList, cuid }) {
  return {
    type: START_PERFIOS,
    payload,
    password,
    appId,
    fileList,
    cuid,
  };
}

export function startPerfiosSuccess(response) {
  return {
    type: START_PERFIOS_SUCCESS,
    response,
  };
}

export function startPerfiosError(error) {
  return {
    type: START_PERFIOS_ERROR,
    error,
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
}

export function updatePerfiosList(data) {
  return {
    type: UPDATE_PERFIOS_LIST,
    data: data,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading: loading,
  };
}

export function getPerfiosStatus(appId) {
  return {
    type: GET_PERFIOS_STATUS,
    appId,
  };
}

export function getPerfiosStatusSuccess(response) {
  return {
    type: GET_PERFIOS_STATUS_SUCCESS,
    response,
  };
}
export function getPerfiosStatusError(error) {
  return {
    type: GET_PERFIOS_STATUS_ERROR,
    error,
  };
}
