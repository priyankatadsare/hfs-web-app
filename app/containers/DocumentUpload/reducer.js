/*
 *
 * DocumentUpload reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILE_UPLOAD,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_SUCCESS,
  FETCH_DOC_LIST,
} from './constants';

export const initialState = {
  uploadedList: [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const documentUploadReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FILE_UPLOAD:
        draft.loading = true;
        break;
      case FILE_UPLOAD_SUCCESS:
        draft.loading = false;
        draft.uploadedList.push(action.response);
        break;
      case FILE_UPLOAD_ERROR:
        draft.loading = false;
        break;
      case FETCH_DOC_LIST:
        draft.payload = action.payload;
        break;
    }
  });

export default documentUploadReducer;
