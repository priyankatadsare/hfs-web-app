/*
 *
 * DocumentUpload actions
 *
 */

import {
  DEFAULT_ACTION,
  FILE_UPLOAD,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,
  FETCH_DOC_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function uploadFile(payload) {
  return {
    type: FILE_UPLOAD,
    payload,
  };
}

export function uploadFileSuccess(response) {
  return {
    type: FILE_UPLOAD_SUCCESS,
    response,
  };
}

export function uploadFileError(error) {
  return {
    type: FILE_UPLOAD_ERROR,
    error,
  };
}

export function fetchDocList(payload) {
  return {
    type: FETCH_DOC_LIST,
    payload,
  };
}
