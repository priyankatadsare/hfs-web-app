import { takeEvery, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import request from 'utils/request';
import { GST_API_URL } from '../App/constants';
import { gstnFetched, gstnFetchingError } from './actions';
import { FETCH_GSTN } from './constants';
import makeSelectApplicationPage from '../ApplicationPage/selectors';

// Individual exports for testing
export default function* gstnInputSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(FETCH_GSTN, fetchGstns);
}

export function* fetchGstns() {
  const globalState = yield select(makeSelectApplicationPage());
  const { users = [] } = globalState.appResponse || {};
  const entityUser = _.get(
    users.filter(
      user =>
        (user.type === 'COMPANY' &&
          _.get(user, 'appLMS.role') === 'Applicant') ||
        (user.type === 'COMPANY' && !_.get(user, 'appLMS.role')),
    ),
    '[0]',
    {},
  );
  if (!_.get(entityUser, 'userIdentities.pan') || !entityUser.cuid) return;

  const requestURL = `${GST_API_URL}?pan=${_.get(
    entityUser,
    'userIdentities.pan',
  )}&cuid=${entityUser.cuid}`;
  // const requestURL = `${GST_API_URL}?pan=AAACR5055K&cuid=1378458459`;
  const options = {
    method: 'GET',
  };

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, options);
    if (response.status && (_.get(response, 'data') || []).length) {
      yield put(gstnFetched(response.data));
    } else {
      yield put(gstnFetchingError(response));
    }
  } catch (err) {
    yield put(gstnFetchingError(err));
  }
}
