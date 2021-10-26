/*
 *
 * DashboardPage reducer
 *
 */
import produce from 'immer';
import {
  LOAD_APPLICATIONS,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAILURE,
} from './constants';

export const initialState = {
  loading: false,
  response: false,
  error: false,
  payload: {
    userId: '100663',
    // userRole: JSON.parse(sessionStorage.getItem('userRole')),
    userRole: 'SM',
    startDate: '',
    endDate: '',
    appId: '',
    requestType: 'PMA',
    panNumber: '',
    customerName: '',
    userActivity: ['OEM_REVIEW'],
    product: 'HFS',
    partner: 'HFSAPP',
  },
};

/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_APPLICATIONS:
        draft.loading = true;
        draft.response = action.response;
        break;
      case LOAD_APPLICATIONS_SUCCESS:
        draft.loading = false;
        draft.response = action.response;
        break;
      case LOAD_APPLICATIONS_FAILURE:
        draft.loading = false;
        draft.response = action.response;
        break;
    }
  });

export default dashboardPageReducer;
