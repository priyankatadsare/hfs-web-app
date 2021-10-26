/*
 *
 * UserProfile actions
 *
 */

import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './constants';

export function fetchUser() {
  return {
    type: FETCH_USER,
  };
}

export function userFetched(response) {
  return {
    type: FETCH_USER_SUCCESS,
    response,
  };
}

export function userFetchingError(error) {
  return {
    type: FETCH_USER_FAILURE,
    error,
  };
}
