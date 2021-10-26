/*
 *
 * AssetTypeDropdown reducer
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
  masterAssetType: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const assetTypeDropdownReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_MASTER_DATA:
        break;
      case GET_MASTER_DATA_SUCCESS: {
        const tempObj = {};
        _.orderBy(
          action.response,
          obj => parseInt(obj.order, 10),
          'asc',
        ).forEach(item => {
          tempObj[item.cmCode] = item.cmValue.trim();
        });
        draft.masterAssetType = tempObj;
        break;
      }
      case GET_MASTER_DATA_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default assetTypeDropdownReducer;
