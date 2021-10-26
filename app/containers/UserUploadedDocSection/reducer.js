/*
 *
 * UserUploadedDocSection reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_DOC_LIST,
  FETCH_DOC_LIST_SUCCESS,
  FETCH_DOC_LIST_ERROR,
} from './constants';

export const initialState = {
  docList: {},
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const userUploadedDocSectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_DOC_LIST:
        draft.payload = action.payload;
        break;
      case FETCH_DOC_LIST_SUCCESS:
        draft.error = '';
        draft.docList[action.response.cuid] = action.response.docList;
        break;
       case FETCH_DOC_LIST_ERROR:
        draft.error = action.error;
        draft.docList = {};
        break;
    }
  });

export default userUploadedDocSectionReducer;
