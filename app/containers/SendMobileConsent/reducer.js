/*
 *
 * SendMobileConsent reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_EMAIL,
} from './constants';

export const initialState = {
  loading: false,
  mobileSent: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const sendMobileConsentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SEND_EMAIL:
        draft.loading = true;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.mobileSent = true;
        draft.loading = false;
        draft.error = false;
        break;
      case SEND_EMAIL_ERROR:
        draft.mobileSent = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default sendMobileConsentReducer;
