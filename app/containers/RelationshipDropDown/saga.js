import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { MASTER_API_URL } from '../App/constants';
import { getMasterDataError, getMasterDataSuccess } from './actions';
import { GET_MASTER_DATA } from './constants';
// Individual exports for testing
export default function* qualificationDropDownSaga() {
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
  // const masterUrl = `${MASTER_API_URL}/get?masterType=${payload}`;
  // const options = {
  //   method: 'GET',
  // };
  const RELATIONS_WITH_BORROWER = [
    'Proprietor',
    'Director',
    'Partner',
    'Trustee',
    'Shareholder',
    'Property Owner',
    'Secretary',
    'Treasurer',
    'Member',
    'Others',
  ];
  try {
    // const response = yield call(request, masterUrl, RELATIONS_WITH_BORROWER);
    // console.log('nsdl response', response);
    // if (response.success)
    yield put(getMasterDataSuccess(RELATIONS_WITH_BORROWER));
    // else yield put(getMasterDataError(response));
  } catch (error) {
    yield put(getMasterDataError(error));
  }
}
