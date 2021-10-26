/*
 *
 * FilterPopup reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_FILTER } from './constants';

export const initialState = {
  panNumber: '',
  customerName: '',
};

/* eslint-disable default-case, no-param-reassign */
const filterPopupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_FILTER:
        draft.panNumber = action.payload.pan;
        draft.customerName = action.payload.customerName;
        break;
    }
  });

export default filterPopupReducer;
