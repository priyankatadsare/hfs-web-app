/*
 *
 * ApplicationPage reducer
 *
 */
import _ from 'lodash';
import produce from 'immer';
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
} from './constants';

export const initialState = {
  loading: false,
  appResponse: false,
  leadResponse: false,
};

/* eslint-disable default-case, no-param-reassign */
const applicationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_APPLICATION_DETAILS:
        draft.loading = true;
        draft.error = false;
        draft.appResponse = false;
        break;
      case LOAD_APPLICATION_DETAILS_FAILED:
        draft.loading = false;
        draft.error = action.error;
        draft.appResponse = false;
        break;
      case LOAD_APPLICATION_DETAILS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.appResponse = action.response;
        break;
      case LOAD_LEAD_DETAILS:
        draft.loading = true;
        draft.error = false;
        draft.leadResponse = false;
        break;
      case LOAD_LEAD_DETAILS_FAILED:
        draft.loading = false;
        draft.error = action.error;
        draft.leadResponse = false;
        break;
      case LOAD_LEAD_DETAILS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.leadResponse = action.response;
        break;
      case UPDATE_LEAD_DETAILS:
        draft.loading = true;
        draft.error = false;
        draft.payload = action.payload;
        break;
      case UPDATE_LEAD_DETAILS_FAILED:
        draft.loading = false;
        draft.error = action.error;
        draft.leadResponse = false;
        break;
      case UPDATE_LEAD_DETAILS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.leadResponse = {
          ...draft.payload,
          details: {
            ...draft.payload,
            ...draft.leadResponse.details,
            data: { ..._.get(draft, 'leadResponse.details.data', {}) },
          },
        };
        break;
      case UPDATE_APP_DETAILS:
        draft.loading = true;
        draft.error = false;
        draft.payload = action.payload;
        break;
      case UPDATE_APP_DETAILS_FAILED:
        draft.loading = false;
        draft.error = action.error;
        draft.leadResponse = false;
        break;
      case UPDATE_APP_DETAILS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.addresses = false;
        draft.currentAddress = false;
        draft.appResponse =
          _.get(action.response, 'data[1].appServiceResponse.body.app') ||
          _.get(action.response, 'data[0].appServiceResponse.body.app');
        break;
      case SET_ADDRESS_LIST:
        draft.addresses = action.addresses;
        break;
      case SET_CURRENT_ADDRESS:
        draft.currentAddress = action.address;
        break;
      case CALL_BUREAU:
        draft.applicant = action.applicant;
        break;
      case CALL_CONSUMER_HUNTER:
        draft.payload = action.payload;
        break;
      case CALL_SME_HUNTER:
        draft.payload = action.payload;
        break;
      case NEW_APPLICATION:
        draft.appResponse = false;
        draft.leadResponse = false;
        draft.addresses = false;
        break;
    }
  });

export default applicationPageReducer;
