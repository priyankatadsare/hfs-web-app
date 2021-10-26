/*
 *
 * AppAuthorization reducer
 *
 */
import produce from 'immer';
import {
  CHECK_AUTHORIZATION,
  SET_AUTHORIZATION,
  AUTHORIZATION_FAILED,
} from './constants';

export const initialState = {
  roles: { CREDIT_REVIEW: '', DEDUPE_REVIEW: '' },
  error: false,
  payload: false,
  loading: false,
};

const appAuthorizationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECK_AUTHORIZATION: {
        draft.loading = true;
        draft.error = false;
        break;
      }
      case SET_AUTHORIZATION:
        draft.loading = false;
        draft.error = false;
        draft.allRoles = action.payload.roles;
        draft.roles = {
          ...draft.roles,
          [action.payload.activity]: action.payload.role,
        };
        break;
      case AUTHORIZATION_FAILED:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default appAuthorizationReducer;
