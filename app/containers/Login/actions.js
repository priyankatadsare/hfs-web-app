/*
 *
 * Login actions
 *
 */
import _ from 'lodash';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  USER_NOT_LOGGED_IN,
} from './constants';

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    data,
  };
}

export function userLogedIn(response) {
  sessionStorage.setItem('actorId', _.get(response, 'data.userCode', ''));
  return {
    type: LOGIN_USER_SUCCESS,
    response,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_USER_FAILED,
    error,
  };
}

export function userNotLoggedIn(error) {
  return {
    type: USER_NOT_LOGGED_IN,
    error,
  };
}
