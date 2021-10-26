/*
 *
 * BorrowerDetailsPendingSection reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPDATE_APP,
  UPDATE_APP_SUCCEESS,
  UPDATE_APP_ERROR,
  UPDATE_ADDRESS_LIST,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  addressList: [],
};

/* eslint-disable default-case, no-param-reassign */
const borrowerDetailsPendingSectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPDATE_APP:
        draft.loading = true;
        break;
      case UPDATE_APP_SUCCEESS:
        draft.loading = false;
        draft.error = false;
        break;
      case UPDATE_APP_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case UPDATE_ADDRESS_LIST:
        draft.addressList = action.payload;
        break;
    }
  });

export default borrowerDetailsPendingSectionReducer;
