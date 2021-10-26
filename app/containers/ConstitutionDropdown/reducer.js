/*
 *
 * ConstitutionDropdown reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_MASTER_DATA,
  GET_MASTER_DATA_ERROR,
  GET_MASTER_DATA_SUCCESS,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const constitutionDropdownReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_MASTER_DATA:
        break;
      case GET_MASTER_DATA_SUCCESS:
        draft.response = action.response.map(item => item.cmValue.trim());
        break;
      case GET_MASTER_DATA_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default constitutionDropdownReducer;
