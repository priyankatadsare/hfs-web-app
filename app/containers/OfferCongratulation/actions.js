/*
 *
 * OfferCongratulation actions
 *
 */

import {
  DEFAULT_ACTION,
  HUNTER_CHECK,
  HUNTER_CHECK_SUCCESS,
  HUNTER_CHECK_ERROR,
  GET_APPLICATION,
  GET_APPLICATION_SUCCESS,
  SET_NO_OFFER_MESSAGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function hunterCheck(data) {
  return {
    type: HUNTER_CHECK,
    payload: data,
  };
}

export function hunterCheckSuccess(data) {
  return {
    type: HUNTER_CHECK_SUCCESS,
    response: data,
  };
}

export function hunterCheckError(data) {
  return {
    type: HUNTER_CHECK_ERROR,
    error: data,
  };
}

export function getApplication(id) {
  return {
    type: GET_APPLICATION,
    id,
  };
}

export function getApplicationSuccess() {
  return {
    type: GET_APPLICATION_SUCCESS,
  };
}

export function setNoOfferMessage(message) {
  return {
    type: SET_NO_OFFER_MESSAGE,
    message,
  };
}
