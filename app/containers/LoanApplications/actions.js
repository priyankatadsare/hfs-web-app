/*
 *
 * LoanApplications actions
 *
 */

import {
  GET_LOAN_APPLICATIONS,
  GET_LOAN_APPLICATIONS_SUCCESS,
  GET_LOAN_APPLICATIONS_FAILURE,
  CREATE_RLA_APPLICATION,
  CREATE_RLA_APPLICATION_SUCCESS,
  CREATE_RLA_APPLICATION_ERROR,
  GET_APP_DETAIL,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
  MASTER_GET_RULES,
  MASTER_GET_RULES_SUCCESS,
  MASTER_GET_RULES_ERROR,
  CREATE_LEAD,
  CREATE_LEAD_SUCCESS,
  CREATE_LEAD_ERROR,
  FETCH_LAN_DETAILS,
  FETCH_LAN_DETAILS_SUCCESS,
  FETCH_LAN_DETAILS_ERROR,
} from './constants';

export function fetchingApplications() {
  return {
    type: GET_LOAN_APPLICATIONS,
  };
}

export function applicationsFetched(response) {
  return {
    type: GET_LOAN_APPLICATIONS_SUCCESS,
    response,
  };
}

export function applicationFetchingError(error) {
  return {
    type: GET_LOAN_APPLICATIONS_FAILURE,
    error,
  };
}

export function createRLA_application(payload) {
  return {
    type: CREATE_RLA_APPLICATION,
    payload,
  };
}

export function createRLA_applicationSuccess(response) {
  return {
    type: CREATE_RLA_APPLICATION_SUCCESS,
    response,
  };
}

export function fetchAppDetails(appId) {
  return {
    type: GET_APP_DETAIL,
    appId,
  };
}

export function fetchAppDetailsSuccess(response) {
  return {
    type: GET_APP_DETAIL_SUCCESS,
    response,
  };
}

export function createRLA_applicationError(error) {
  return {
    type: CREATE_RLA_APPLICATION_ERROR,
    error,
  };
}

export function fetchAppDetailsError(message) {
  return {
    type: GET_APP_DETAIL_ERROR,
    message,
  };
}

export function getMasterRules(payload) {
  return {
    type: MASTER_GET_RULES,
    payload,
  };
}

export function getMasterRulesSuccess(response) {
  return {
    type: MASTER_GET_RULES_SUCCESS,
    response,
  };
}

export function getMasterRulesError(error) {
  return {
    type: MASTER_GET_RULES_ERROR,
    error,
  };
}

export function createLead(payload) {
  return {
    type: CREATE_LEAD,
    payload,
  };
}

export function createLeadSuccess(response) {
  return {
    type: CREATE_LEAD_SUCCESS,
    response,
  };
}

export function createLeadError(error) {
  return {
    type: CREATE_LEAD_ERROR,
    error,
  };
}

export function fetchLanDetails(payload) {
  return {
    type: FETCH_LAN_DETAILS,
    payload,
  };
}

export function fetchLanDetailsSuccess(response) {
  return {
    type: FETCH_LAN_DETAILS_SUCCESS,
    response,
  };
}

export function fetchLanDetailsError(error) {
  return {
    type: FETCH_LAN_DETAILS_ERROR,
    error,
  };
}
