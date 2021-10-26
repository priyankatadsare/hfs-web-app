import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_LOCATION } from './constants';
import { PINCODE_API_URL } from '../App/constants';
import { getLocationSuccess, getLocationError } from './actions';
// Individual exports for testing
export default function* pincodeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LOCATION, function*(action) {
    const pincode = action.payload;
    yield call(getLocationByPincode, pincode);
  });
}

export function* getLocationByPincode(pincode) {
  console.log('pincode in saga', pincode);

  const requestURL = `${PINCODE_API_URL}?zipCode=${pincode}`;

  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    console.log('Response from pincode API', response);
    if (response.status === 'success') {
      yield put(getLocationSuccess(response.data));
    } else {
      yield put(getLocationError(response.data));
    }
  } catch (err) {
    yield put(getLocationError(err));
  }
}
