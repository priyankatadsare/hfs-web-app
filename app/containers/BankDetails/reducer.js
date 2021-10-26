/*
 *
 * BankDetails reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  FETCH_BANKS,
  FETCH_BANKS_FAILURE,
  FETCH_BANKS_SUCCESS,
  UPDATE_PERFIOS_LIST,
  SET_LOADING,
  GET_PERFIOS_STATUS,
  GET_PERFIOS_STATUS_SUCCESS,
  GET_PERFIOS_STATUS_ERROR,
} from './constants';

export const initialState = {
  response: false,
  error: false,
  payload: false,
  perfiosList: [],
  loading: false,
  perfiosStatus: [],
};

/* eslint-disable default-case, no-param-reassign */
const bankDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_BANKS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_BANKS_SUCCESS: {
        draft.loading = false;
        draft.response = {
          banks: action.data,
        };
        draft.error = false;
        break;
      }
      case FETCH_BANKS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case UPDATE_PERFIOS_LIST:
        draft.perfiosList = action.data;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case GET_PERFIOS_STATUS:
        draft.loading = true;
        break;
      case GET_PERFIOS_STATUS_SUCCESS:
        draft.loading = false;
        draft.perfiosStatus = action.response;
        break;
      case GET_PERFIOS_STATUS_ERROR:
        draft.loading = false;
        draft.perfiosStatus = [];
        break;
      case LOCATION_CHANGE:
        draft.perfiosStatus = [];
        break;
    }
  });

export default bankDetailsReducer;
