/*
 *
 * LoanDetails reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPDATE_APP,
  UPDATE_APP_SUCCEESS,
  UPDATE_APP_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const loanDetailsReducer = (state = initialState, action) =>
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
    }
  });

export default loanDetailsReducer;
