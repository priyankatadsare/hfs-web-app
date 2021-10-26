/*
 *
 * GstnInput reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  DEFAULT_ACTION,
  FETCH_GSTN,
  FETCH_GSTN_SUCCESS,
  FETCH_GSTN_FAILED,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const gstnInputReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_GSTN:
        break;
      case FETCH_GSTN_SUCCESS:
        draft.error = false;
        draft.response = _.map(
          _.filter(action.response, { authStatus: 'Active' }),
          'gstinId',
        );
        break;
      case FETCH_GSTN_FAILED:
        draft.error = action.error;
        draft.response = [];
        break;
    }
  });

export default gstnInputReducer;
