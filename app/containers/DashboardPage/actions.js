/*
 *
 * DashboardPage actions
 *
 */

import { LOAD_APPLICATIONS, LOAD_APPLICATIONS_SUCCESS, LOAD_APPLICATIONS_FAILURE } from './constants';

export function loadApps(state) {
  return {
    type: LOAD_APPLICATIONS,
    state,
  };
}

export function appsLoaded(response) {
  return {
    type: LOAD_APPLICATIONS_SUCCESS,
    response
  };
}

export function loadAppsFailed(error) {
  return {
    type: LOAD_APPLICATIONS_FAILURE,
    error
  };
}
