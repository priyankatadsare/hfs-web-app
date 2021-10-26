/*
 *
 * supplierDropdown reducer
 *
 */

import _ from 'lodash';
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
};

/* eslint-disable default-case, no-param-reassign */
const supplierDropdownReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_MASTER_DATA:
        break;
      case GET_MASTER_DATA_SUCCESS: {
        draft.response = _.orderBy(
          action.response,
          obj => parseInt(obj.order, 10),
          'asc',
        ).map(item => item.cmValue.trim());
        break;
      }
      case GET_MASTER_DATA_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default supplierDropdownReducer;
