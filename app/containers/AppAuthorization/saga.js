import { put, takeEvery, call } from 'redux-saga/effects';
import request from 'utils/request';
import * as actions from './constants';
import { authorizationSuccess, authorizationFailed } from './actions';

export function* checkAuthorize(action) {
  const { activity } = action.payload;
  const requestURL = `${API_URL}/makerChecker/v1/userRole/fetch?userId=${userId}&activity=${activity}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    if (response.status) {
      yield put(
        authorizationSuccess(activity, response.data[0].role, response.data),
      );
    } else {
      yield put(authorizationFailed(response.message));
    }
  } catch (error) {
    yield put(authorizationFailed(error));
  }
}

export default function* appAuthorizationSaga() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorize);
}
