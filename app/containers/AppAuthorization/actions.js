/*
 *
 * App Authorization actions
 *
 */

import * as actions from './constants';

export function checkAuthorization(activity) {
  return {
    type: actions.CHECK_AUTHORIZATION,
    payload: {
      activity,
    },
  };
}

export function authorizationFailed(error) {
  return {
    type: actions.AUTHORIZATION_FAILED,
    payload: {
      error,
    },
  };
}

export function authorizationSuccess(activity, role, roles) {
  return {
    type: actions.SET_AUTHORIZATION,
    payload: {
      activity,
      role,
      roles,
    },
  };
}
