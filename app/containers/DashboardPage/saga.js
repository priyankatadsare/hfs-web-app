import { call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { API_URL, API_WRAPPER_URL } from 'containers/App/constants';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { appsLoaded, loadAppsFailed } from './actions';
import { LOAD_APPLICATIONS } from './constants';
import request from 'utils/request';
import makeSelectDashboardPage from './selectors';
import { SET_FILTER } from '../FilterPopup/constants';
import makeSelectFilterPopup from '../FilterPopup/selectors';

/**
 * Github repos request/response handler
 */
export function* fetchApplications({ state }) {
  const { payload } = yield select(makeSelectDashboardPage());
  const filters = yield select(makeSelectFilterPopup());
  if (state == 'pending' || state == 'closed') {
    payload.state = state;
  }
  const userId = yield select(makeSelectCurrentUser()) ||
    sessionStorage.getItem('actorId');
  const requestURL = `${
    state == 'pending' || state == 'closed' ? API_WRAPPER_URL : API_URL
  }/makerChecker/v2/fetch/pending/activities`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...payload, userId, ...filters }),
    });
    if (response.hasOwnProperty('status')) {
      if (!response.status) {
        yield put(appsLoaded([]));
        return;
      }
    }
    if (response.data) {
      yield put(appsLoaded(response.data));
    } else {
      yield put(appsLoaded(response));
    }
  } catch (err) {
    yield put(loadAppsFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dashboardPageSaga() {
  yield takeEvery(LOAD_APPLICATIONS, fetchApplications);
  yield takeEvery(SET_FILTER, fetchApplications);
}
