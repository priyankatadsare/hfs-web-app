/*
 *
 * ApplicationPage actions
 *
 */

import {
  LOAD_APPLICATION_DETAILS,
  LOAD_APPLICATION_DETAILS_SUCCESS,
  LOAD_APPLICATION_DETAILS_FAILED,
  LOAD_LEAD_DETAILS,
  LOAD_LEAD_DETAILS_SUCCESS,
  LOAD_LEAD_DETAILS_FAILED,
  UPDATE_LEAD_DETAILS,
  UPDATE_LEAD_DETAILS_SUCCESS,
  UPDATE_LEAD_DETAILS_FAILED,
  UPDATE_APP_DETAILS,
  UPDATE_APP_DETAILS_SUCCESS,
  UPDATE_APP_DETAILS_FAILED,
  SET_ADDRESS_LIST,
  SET_CURRENT_ADDRESS,
  CALL_BUREAU,
  NEW_APPLICATION,
  CALL_CONSUMER_HUNTER,
  CALL_SME_HUNTER,
  CALL_COMMERCIAL_BUREAU,
} from './constants';

export function loadApplicationDetails(appid) {
  return {
    type: LOAD_APPLICATION_DETAILS,
    appid,
  };
}

export function applicationLoaded(response) {
  return {
    type: LOAD_APPLICATION_DETAILS_SUCCESS,
    response,
  };
}

export function loadApplicationFailed(error) {
  return {
    type: LOAD_APPLICATION_DETAILS_FAILED,
    error,
  };
}

export function loadLeadDetails(leadid) {
  return {
    type: LOAD_LEAD_DETAILS,
    leadid,
  };
}

export function leadLoaded(response) {
  return {
    type: LOAD_LEAD_DETAILS_SUCCESS,
    response,
  };
}

export function leadLoadFailed(error) {
  return {
    type: LOAD_LEAD_DETAILS_FAILED,
    error,
  };
}

export function updateLead(payload) {
  return {
    type: UPDATE_LEAD_DETAILS,
    payload,
  };
}

export function leadUpdated(response) {
  return {
    type: UPDATE_LEAD_DETAILS_SUCCESS,
    response,
  };
}

export function leadUpdateFailed(error) {
  return {
    type: UPDATE_LEAD_DETAILS_FAILED,
    error,
  };
}

export function updateApp(payload) {
  return {
    type: UPDATE_APP_DETAILS,
    payload,
  };
}

export function appUpdated(response) {
  return {
    type: UPDATE_APP_DETAILS_SUCCESS,
    response,
  };
}

export function appUpdateFailed(error) {
  return {
    type: UPDATE_APP_DETAILS_FAILED,
    error,
  };
}

export function setAddresses(addresses) {
  return {
    type: SET_ADDRESS_LIST,
    addresses,
  };
}

export function setCurentAddress(address) {
  return {
    type: SET_CURRENT_ADDRESS,
    address,
  };
}

export function callBureau(applicant) {
  return {
    type: CALL_BUREAU,
    applicant,
  };
}

export function callConsumerHunter(payload) {
  return {
    type: CALL_CONSUMER_HUNTER,
    payload,
  };
}

export function callSmeHunter(payload) {
  return {
    type: CALL_SME_HUNTER,
    payload,
  };
}

export function newApp() {
  return {
    type: NEW_APPLICATION,
  };
}

export function callCommercialBureau(payload) {
  return {
    type: CALL_COMMERCIAL_BUREAU,
    payload,
  };
}
