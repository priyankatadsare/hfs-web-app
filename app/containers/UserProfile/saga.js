import { call, put, select, takeEvery } from 'redux-saga/effects';
import { USER_SERVICE_API_URL } from 'containers/App/constants';
import { userFetched, userFetchingError } from './actions';
import { FETCH_USER } from './constants';

import request from 'utils/request';
import makeSelectLoanApplications from './selectors';

/**
 * Github repos request/response handler
 */
export function* fetchUser() {
  // { cuid = 1000051583 }
  const cuid = JSON.parse(sessionStorage.getItem('cuid'));
  // Select username from store
  const { response } = yield select(makeSelectLoanApplications());
  if (response) {
    yield put(userFetched(response));
  }
  const requestURL = `${USER_SERVICE_API_URL}/${cuid}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(userFetched(response.user));
  } catch (err) {
    yield put(userFetchingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userProfileSaga() {
  // Watches for GET LOAN APPLICATIONS actions and calls fetchUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(FETCH_USER, fetchUser);
}
