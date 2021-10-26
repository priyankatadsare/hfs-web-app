import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { NSDL_API_URL } from '../App/constants';
import { fetchPanError, fetchPanSuccess } from './actions';
import { FETCH_PAN } from './constants';
// Individual exports for testing
export default function* panInputSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(FETCH_PAN, fetchPanDetails);
}

function* fetchPanDetails({ payload }) {
  // console.log('payload', payload);
  const nsdlData = {
    pan: payload.toUpperCase(),
    cuid: '',
  };
  // console.log('nsdl hitting JSON data', nsdlData);
  const nsdlUrl = `${NSDL_API_URL}`;
  const nsdlOptions = {
    method: 'POST',
    body: JSON.stringify(nsdlData),
  };
  try {
    const nsdlResponse = yield call(request, nsdlUrl, nsdlOptions);
    // console.log('nsdl response', nsdlResponse);
    if (nsdlResponse.success) yield put(fetchPanSuccess(nsdlResponse));
    else yield put(fetchPanError(nsdlResponse));
  } catch (error) {
    yield put(fetchPanError(error));
  }
}
