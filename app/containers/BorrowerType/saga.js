import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { MASTER_API_URL } from '../App/constants';
import { getMasterDataError, getMasterDataSuccess } from './actions';
import { GET_MASTER_DATA } from './constants';

// Individual exports for testing
export default function* borrowerTypeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(GET_MASTER_DATA, getMasterData);
}

function* getMasterData({ payload }) {
  // console.log('payload', payload);
  // const nsdlData = {
  //   pan: payload.toUpperCase(),
  //   cuid: '',
  // };
  // console.log('nsdl hitting JSON data', nsdlData);
  const masterUrl = `${MASTER_API_URL}/get?masterType=${payload}`;
  const options = {
    method: 'GET',
  };
  try {
    const response = yield call(request, masterUrl, options);
    // console.log('nsdl response', response);
    if (response.success)
      yield put(getMasterDataSuccess(response.masterData || []));
    else yield put(getMasterDataError(response));
  } catch (error) {
    yield put(getMasterDataError(error));
  }
}
