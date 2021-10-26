/*
 *
 * ProgramTypeDropdown reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_MASTER_DATA,
  GET_MASTER_DATA_ERROR,
  GET_MASTER_DATA_SUCCESS,
} from './constants';

export const initialState = {
  response: false,
  error: false,
  masterProgData: {},
};

/* eslint-disable default-case, no-param-reassign */
const ProgramTypeDropdownReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_MASTER_DATA:
        break;
      case GET_MASTER_DATA_SUCCESS:
        let tempObj1 = {};
        action.response.forEach(item => {
          tempObj1[item.cmCode] = item.cmValue;
        });
        draft.masterProgData = tempObj1;
        break;
      case GET_MASTER_DATA_ERROR:
        draft.error = action.error;
        draft.masterProgData = {};
        break;
    }
  });

export default ProgramTypeDropdownReducer;
