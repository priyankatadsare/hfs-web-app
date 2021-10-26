/*
 *
 * PanInput reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_PAN,
  FETCH_PAN_ERROR,
  FETCH_PAN_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  response: {},
};

/* eslint-disable default-case, no-param-reassign */
const panInputReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_PAN:
        draft.payload = action.payload;
        draft.loading = true;
        break;
      case FETCH_PAN_SUCCESS:
        draft.response[draft.payload] = action.response;
        draft.loading = false;
        break;
      case FETCH_PAN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default panInputReducer;
