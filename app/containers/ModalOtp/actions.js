/*
 *
 * ModalOtp actions
 *
 */

import {
  DEFAULT_ACTION,
  SEND_OTP,
  SEND_OTP_ERROR,
  SEND_OTP_SUCCESS,
  VALIDATE_OTP,
  VALIDATE_OTP_ERROR,
  VALIDATE_OTP_SUCCESS,
  SET_OTP_SUCCESS,
  SET_SHOW_MODAL,
  SET_SHOW_ERROR_MODAL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function sendOTP(data) {
  return {
    type: SEND_OTP,
    payload: data,
  };
}

export function sendOTPSuccess(data) {
  return {
    type: SEND_OTP_SUCCESS,
    payload: data,
  };
}

export function sendOTPError(error) {
  return {
    type: SEND_OTP_ERROR,
    payload: error,
  };
}

export function validateOTP(data) {
  return {
    type: VALIDATE_OTP,
    payload: data,
  };
}

export function validateOTPSuccess(data) {
  return {
    type: VALIDATE_OTP_SUCCESS,
    payload: data,
  };
}

export function validateOTPError(error) {
  return {
    type: VALIDATE_OTP_ERROR,
    error: error,
  };
}

export function setOtpSuccess(data) {
  return {
    type: SET_OTP_SUCCESS,
    payload: data,
  };
}

export function setShowModal(data) {
  return {
    type: SET_SHOW_MODAL,
    payload: data,
  };
}

export function setShowErrorModal(data) {
  return {
    type: SET_SHOW_ERROR_MODAL,
    payload: data,
  };
}
