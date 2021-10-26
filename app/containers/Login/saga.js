import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';
import _ from 'lodash';
import { toggleCommonErrorModal } from 'containers/App/actions';
import { userLogedIn, loginFailed, userNotLoggedIn } from './actions';
import { LOGIN_USER } from './constants';

/**
 * Github repos request/response handler
 */
export function* loginUser({ data: { userName, password } }) {
  const requestURL = `${API_URL}/auth/user/login/v1`;
  const body = {
    userName,
    password: btoa(password),
    grantType: 'password',
  };
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (_.get(response, 'status') === 'success') {
      yield put(userLogedIn(response));
      yield put(push('/dashboard/open'));
    } else {
      yield put(
        toggleCommonErrorModal({
          show: true,
          message: _.get(response, 'message'),
        }),
      );
      yield put(userNotLoggedIn(_.get(response, 'message')));
    }
    // const response = { data: { userCode: '100693' } };
  } catch (err) {
    yield put(loginFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}
