/*
 *
 * BorrowerDetails reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CREATE_NEW_APPLICATION,
  CREATE_NEW_APPLICATION_SUCCESS,
  CREATE_NEW_APPLICATION_ERROR,
} from './constants';

export const initialState = {
  newAppResponse: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const borrowerDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CREATE_NEW_APPLICATION:
        draft.payload = action.payload;
        break;
      case CREATE_NEW_APPLICATION_SUCCESS:
        draft.newAppResponse = action.response;
        break;
      case CREATE_NEW_APPLICATION_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default borrowerDetailsReducer;
