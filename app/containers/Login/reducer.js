/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  USER_NOT_LOGGED_IN,
} from './constants';

export const initialState = {
  loading: false,
  response: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
        draft.loading = true;
        break;
      case LOGIN_USER_SUCCESS:
        draft.response = action.response;
        draft.loading = false;
        draft.error = false;
        break;
      case LOGIN_USER_FAILED:
        draft.error = action.error;
        draft.loading = false;
        draft.response = false;
        break;
      case USER_NOT_LOGGED_IN:
        draft.error = action.error;
        draft.loading = false;
        draft.response = false;
        break;
    }
  });

export default loginReducer;
