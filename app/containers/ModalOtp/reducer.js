/*
 *
 * ModalOtp reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  loading: false,
  otpLoading: false,
  error: false,
  otpSuccess: false,
  requestId: false,
  showModal: false,
  showErrorModal: false,
};

/* eslint-disable default-case, no-param-reassign */
const modalOtpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SEND_OTP:
        draft.otpLoading = true;
        draft.error = false;
        break;
      case SEND_OTP_SUCCESS:
        draft.otpLoading = false;
        draft.requestId = action.payload.otpRequestId;
        draft.cuid = action.payload.cuId;
        draft.error = false;
        break;
      case SEND_OTP_ERROR:
        draft.otpLoading = false;
        draft.error = action.payload;
        draft.otpSuccess = false;
        draft.showErrorModal = true;
        break;
      case VALIDATE_OTP:
        draft.loading = true;
        draft.error = false;
        break;
      case VALIDATE_OTP_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.otpSuccess = true;
        draft.otpVerifiedAt = new Date();
        draft.showModal = false;
        window.sessionStorage.setItem('cuid', JSON.stringify(draft.cuid));
        break;
      case VALIDATE_OTP_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.otpSuccess = false;
        break;
      case SET_OTP_SUCCESS:
        draft.otpSuccess = action.payload;
        break;
      case SET_SHOW_MODAL:
        draft.showModal = action.payload;
        break;
      case SET_SHOW_ERROR_MODAL:
        draft.showErrorModal = action.payload;
        break;
    }
  });

export default modalOtpReducer;
