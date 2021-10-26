/*
 *
 * CheckConsent reducer
 *
 */
import produce from 'immer';
import {
  CHECK_CONSENT,
  CHECK_CONSENT_ERROR,
  CHECK_CONSENT_SUCCESS,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  loading: false,
  response: false,
  error: false,
  consentVerified: false,
};

/* eslint-disable default-case, no-param-reassign */
const checkConsentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHECK_CONSENT:
        draft.payload = action.payload;
        draft.loading = true;
        break;
      case CHECK_CONSENT_SUCCESS:
        draft.consentVerified = true;
        draft.error = false;
        draft.loading = false;
        break;
      case CHECK_CONSENT_ERROR:
        draft.error = true;
        draft.consentVerified = false;
        draft.loading = false;
        break;
    }
  });

export default checkConsentReducer;
