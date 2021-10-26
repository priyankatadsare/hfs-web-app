/*
 *
 * LoanApplications reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import moment from 'moment';
import {
  GET_LOAN_APPLICATIONS,
  GET_LOAN_APPLICATIONS_SUCCESS,
  GET_LOAN_APPLICATIONS_FAILURE,
  CREATE_RLA_APPLICATION,
  CREATE_RLA_APPLICATION_ERROR,
  CREATE_RLA_APPLICATION_SUCCESS,
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

export const initialState = {
  loading: true,
  error: false,
  response: false,
  masterData: [],
  runningloans: [],
  lanDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const loanApplicationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LOAN_APPLICATIONS:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_LOAN_APPLICATIONS_SUCCESS:
        const accountList = _.uniqBy(
          action.response.commonLmsResponseList,
          'loanAccountNumber',
        );
        const sortedData = _.orderBy(
          accountList,
          [object => new moment(object.loan_start_date)],
          ['desc'],
        );
        draft.loading = false;
        draft.response = action.response;
        draft.runningApplication = _.filter(sortedData, {
          status: 'In-Progress',
        });
        draft.closedloans = _.filter(sortedData, {
          status: 'Closed',
        });
        draft.runningloans = _.filter(sortedData, loan =>
          ['Active', 'Live'].includes(loan.status),
        );
        draft.currentLoan = _.find(sortedData, {
          status: 'Active',
        });
        draft.error = false;
        break;
      case GET_LOAN_APPLICATIONS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case CREATE_RLA_APPLICATION:
        break;
      case CREATE_RLA_APPLICATION_SUCCESS:
        break;
      case CREATE_RLA_APPLICATION_ERROR:
        break;
      case GET_APP_DETAIL:
        draft.loading = true;
        break;
      case GET_APP_DETAIL_SUCCESS:
        draft.loading = false;
        draft.appDetails = action.response;
        break;
      case GET_APP_DETAIL_ERROR:
        draft.loading = false;
        draft.error = action.message;
        break;
      case MASTER_GET_RULES:
        break;
      case MASTER_GET_RULES_SUCCESS:
        draft.masterData.push(action.response.masterData[0]);
        break;
      case MASTER_GET_RULES_ERROR:
        //draft.masterData = false;
        break;
      case CREATE_LEAD:
        break;
      case CREATE_LEAD_SUCCESS:
        break;
      case CREATE_LEAD_ERROR:
        break;
      case FETCH_LAN_DETAILS:
        draft.loading = true;
        break;
      case FETCH_LAN_DETAILS_SUCCESS:
        draft.loading = false;
        draft.lanDetails[action.response['loan_id']] = action.response;
        break;
      case FETCH_LAN_DETAILS_ERROR:
        draft.loading = false;
        break;
    }
  });

export default loanApplicationsReducer;
