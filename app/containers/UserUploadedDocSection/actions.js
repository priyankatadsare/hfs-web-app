/*
 *
 * UserUploadedDocSection actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_DOC_LIST,
  FETCH_DOC_LIST_SUCCESS,
  FETCH_DOC_LIST_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchDocList(payload) {
  return {
    type: FETCH_DOC_LIST,
    payload,
  };
}
export function fetchDocListSucccess(response) {
  return {
    type: FETCH_DOC_LIST_SUCCESS,
    response,
  };
}

export function fetchDocListError(error) {
  return {
    type: FETCH_DOC_LIST_ERROR,
    error,
  };
}