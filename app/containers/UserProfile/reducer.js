/*
 *
 * UserProfile reducer
 *
 */
import produce from 'immer';
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  response: false,
};

/* eslint-disable default-case, no-param-reassign */
const userProfileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USER:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.response = action.response;
        break;
      case FETCH_USER_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default userProfileReducer;
