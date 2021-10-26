import { takeEvery, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import request from 'utils/request';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { MAKER_CHECKER_API_URL } from '../App/constants';
import { SET_USER_DECISION } from './constants';
import { setUserDecisionError, setUserDecisionSuccess } from './actions';
import { toggleCommonErrorModal } from '../App/actions';

// Individual exports for testing
export default function* finalSubmissionPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(SET_USER_DECISION, callUserDecision);
}

function* callUserDecision({ payload }) {
  // console.log('payload', payload);
  const globalState = yield select(makeSelectApplicationPage());
  const currentUser = yield select(makeSelectCurrentUser());

  const { leadResponse } = globalState;

  const activitySrlNo = _.get(leadResponse, 'details.data.activitySrlNo', '');

  const data = {
    activitySrlNo: parseInt(activitySrlNo, 10),
    employeeId: currentUser,
    status: 'APPROVED',
    remarks: 'ok',
    nextApprovalUserId: '',
    sendTo: '',
  };
  // console.log('nsdl hitting JSON data', nsdlData);
  const masterUrl = `${MAKER_CHECKER_API_URL}/user/decision`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  };
  try {
    const response = yield call(request, masterUrl, options);
    if (response.status) {
      yield put(setUserDecisionSuccess(response));
    } else {
      yield put(setUserDecisionError(response));
      yield put(
        toggleCommonErrorModal({
          show: true,
          message: response.message || 'Internal Server Error',
        }),
      );
    }
  } catch (error) {
    yield put(setUserDecisionError(error));
    yield put(
      toggleCommonErrorModal({
        show: true,
        message:
          _.get(error, 'errors[0]', 'Internal Server Error') ||
          'Internal Server Error',
      }),
    );
  }
}
