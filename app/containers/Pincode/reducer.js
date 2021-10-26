/*
 *
 * Pincode reducer
 *
 */
import produce from 'immer';
import {
  GET_LOCATION,
  GET_LOCATION_ERROR,
  GET_LOCATION_SUCCESS,
  SET_LOADING,
} from './constants';

export const initialState = {
  pincode: false,
  location: false,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const pincodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LOCATION:
        draft.pincode = action.payload;
        draft.location = false;
        draft.loading = true;
        break;
      case GET_LOCATION_SUCCESS:
        draft.location = action.payload;
        draft.loading = false;
        draft.error = false;
        break;
      case GET_LOCATION_ERROR:
        draft.location = false;
        draft.error = action.payload;
        draft.loading = false;
        break;
      case SET_LOADING:
        draft.loading = true;
        break;
    }
  });

export default pincodeReducer;
