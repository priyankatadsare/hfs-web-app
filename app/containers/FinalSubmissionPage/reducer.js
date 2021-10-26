/*
 *
 * FinalSubmissionPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  DEFAULT_ACTION,
  SET_USER_DECISION,
  SET_USER_DECISION_SUCCESS,
  SET_USER_DECISION_ERROR,
  SET_SUCCESS_FALSE,
} from './constants';

export const initialState = {
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const finalSubmissionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_USER_DECISION:
        draft.success = false;
        break;
      case SET_USER_DECISION_SUCCESS:
        draft.success = true;
        break;
      case SET_USER_DECISION_ERROR:
        break;
      case SET_SUCCESS_FALSE:
        draft.success = false;
        break;
      case LOCATION_CHANGE:
        draft.success = false;
        break;
    }
  });

export default finalSubmissionPageReducer;
