/*
 *
 * OfferCongratulation reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  HUNTER_CHECK,
  HUNTER_CHECK_SUCCESS,
  HUNTER_CHECK_ERROR,
  GET_APPLICATION,
  GET_APPLICATION_SUCCESS,
  SET_NO_OFFER_MESSAGE,
} from './constants';

export const initialState = {
  error: false,
  loading: true,
  uiStage: '2.05',
  noOfferMessage: false,
};

/* eslint-disable default-case, no-param-reassign */
const offerCongratulationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case HUNTER_CHECK:
        draft.payload = action.payload;
        draft.loading = true;
        break;
      case HUNTER_CHECK_SUCCESS:
        draft.response = action.response;
        draft.loading = false;
        draft.error = false;
        break;
      case HUNTER_CHECK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_APPLICATION:
        draft.loading = true;
        break;
      case GET_APPLICATION_SUCCESS:
        draft.loading = false;
        break;
      case SET_NO_OFFER_MESSAGE:
        draft.noOfferMessage = action.message;
        break;
    }
  });

export default offerCongratulationReducer;
