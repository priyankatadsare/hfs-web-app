/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import _ from 'lodash';
import produce from 'immer';
import {
  GET_LOAN_APPLICATIONS,
  GET_LOAN_APPLICATIONS_SUCCESS,
  GET_LOAN_APPLICATIONS_FAILURE,
  GET_APP_DETAIL,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
  CREATE_RLA_APPLICATION,
  CREATE_RLA_APPLICATION_ERROR,
  CREATE_RLA_APPLICATION_SUCCESS,
  FETCH_LAN_DETAILS,
  FETCH_LAN_DETAILS_ERROR,
  FETCH_LAN_DETAILS_SUCCESS,
} from 'containers/LoanApplications/constants';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  USER_NOT_LOGGED_IN,
} from 'containers/Login/constants';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  SHOW_WAITING_MODAL,
  HIDE_WAITING_MODAL,
  TOGGLE_SERVER_ERROR_MODAL,
  TOGGLE_COMMON_ERROR_MODAL,
  LOG_OUT,
} from './constants';

import {
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
  VALIDATE_OTP,
  VALIDATE_OTP_ERROR,
  VALIDATE_OTP_SUCCESS,
} from '../ModalOtp/constants';
import {
  CREATE_NEW_APPLICATION,
  CREATE_NEW_APPLICATION_ERROR,
  CREATE_NEW_APPLICATION_SUCCESS,
} from '../BorrowerDetails/constants';
import {
  SET_USER_DECISION,
  SET_USER_DECISION_ERROR,
  SET_USER_DECISION_SUCCESS,
} from '../FinalSubmissionPage/constants';
import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from '../GuarantorPage/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: sessionStorage.getItem('actorId'),
  show: false,
  internalServerError: false,
  commonError: false,
  commonErrorMessage: 'Something went wrong!',
  userData: {
    repositories: false,
  },
  currentApplication: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case SHOW_WAITING_MODAL:
      case GET_LOAN_APPLICATIONS:
      case SEND_OTP:
      case GET_APP_DETAIL:
      case VALIDATE_OTP:
      case CREATE_RLA_APPLICATION:
      case FETCH_LAN_DETAILS:
      case LOGIN_USER:
      case CREATE_NEW_APPLICATION:
      case SET_USER_DECISION:
      case UPDATE_PROFILE:
        draft.show = action.show === undefined ? true : action.show;
        break;

      case HIDE_WAITING_MODAL:
      case GET_LOAN_APPLICATIONS_SUCCESS:
      case SEND_OTP_SUCCESS:
      case SEND_OTP_ERROR:
      case GET_APP_DETAIL_ERROR:
      case VALIDATE_OTP_ERROR:
      case CREATE_RLA_APPLICATION_SUCCESS:
      case GET_APP_DETAIL_SUCCESS:
      case FETCH_LAN_DETAILS_SUCCESS:
      case FETCH_LAN_DETAILS_ERROR:
      case SET_USER_DECISION_SUCCESS:
      case SET_USER_DECISION_ERROR:
      case UPDATE_PROFILE_SUCCESS:
        draft.show = false;
        break;
      case LOGIN_USER_SUCCESS:
        draft.currentUser = _.get(action, 'response.data.userCode');
        draft.show = false;
        break;
      case USER_NOT_LOGGED_IN:
        draft.show = false;
        break;
      case VALIDATE_OTP_SUCCESS:
        draft.show = false;
        draft.currentUser = true;
        break;

      case GET_LOAN_APPLICATIONS_FAILURE:
      case CREATE_RLA_APPLICATION_ERROR:
      case LOGIN_USER_FAILED:
      case CREATE_NEW_APPLICATION_ERROR:
        draft.show = false;
        draft.internalServerError = true;
        break;
      case TOGGLE_SERVER_ERROR_MODAL:
        draft.internalServerError = action.show;
        break;
      case TOGGLE_COMMON_ERROR_MODAL:
        draft.commonError = action.payload.show;
        draft.commonErrorMessage = action.payload.message;
        break;
      case LOG_OUT:
        draft.currentUser = false;
        break;
      case CREATE_NEW_APPLICATION_SUCCESS:
        draft.show = false;
        draft.currentApplication = action.response;
        break;
    }
  });

export default appReducer;
