/*
 *
 * GuarantorPage reducer
 *
 */
import _ from 'lodash';
import produce from 'immer';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FETCH_QUALIFICATION_SUCCESS,
  FETCH_QUALIFICATION_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  response: {},
  masterQualificationData: [],
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const guarantorPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER:
        draft.loading = true;
        draft.cuid = action.cuid;
        break;
      case LOAD_USER_SUCCESS:
        draft.loading = false;
        draft.response[draft.cuid] = action.response;
        break;
      case LOAD_USER_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_QUALIFICATION_SUCCESS: {
        draft.masterQualificationData = _.orderBy(
          action.response,
          obj => parseInt(obj.order, 10),
          'asc',
        ).map(item => item.cmValue);
        break;
      }
      case FETCH_QUALIFICATION_FAILURE:
        draft.masterQualificationData = [];
        break;
      case UPDATE_PROFILE:
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.latestGuarantorCuid = action.response;
        break;
    }
  });

export default guarantorPageReducer;
