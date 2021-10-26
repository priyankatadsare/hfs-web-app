import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { VALIDATE_OTP, SEND_OTP } from './constants';
import { push } from 'react-router-redux';

import {
  validateOTPSuccess,
  validateOTPError,
  sendOTPSuccess,
  sendOTPError,
  setShowModal,
} from './actions';
import request from 'utils/request';
import {
  OTP_API_URL,
  MOBILE_PATTERN,
  API_URL,
  USER_SERVICE_API_URL,
} from '../App/constants';
import { makeSelectRequestId } from './selectors';
import { makeSelectFormData } from '../Login/selectors';
export default function* modalOtpSaga() {
  yield takeEvery(VALIDATE_OTP, function*(action) {
    const otpData = action.payload;
    yield call(validateOTP, otpData);
  });

  yield takeEvery(SEND_OTP, function*(action) {
    const otpData = action.payload;
    yield call(sendOTP, otpData);
  });
}

export function* validateOTP(data) {
  console.log('Validate OTP request data', data);
  const requestId = yield select(makeSelectRequestId());
  const formData = yield select(makeSelectFormData());
  data['request_id'] = requestId;
  console.log('data for validate otp request', data);
  const requestURL = `${OTP_API_URL}/validate${
    MOBILE_PATTERN.test(formData.mobileOrEmail) ? '' : '/email'
  }`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  };

  try {
    const repos = yield call(request, requestURL, options);
    console.log('Data from OTP call', repos);
    // let repos = {
    //   success: true,
    // };

    if (repos.success) {
      //$('.modal').modal('hide');
      yield put(validateOTPSuccess({ status: true }));
      //Callback for success validation of OTP
      // yield loginAPI(formData.mobile);
      window.history.replaceState(null, null, '/');
      yield put(push('/'));
    } else {
      yield put(validateOTPError(repos));
    }
  } catch (err) {
    console.log('Error from validate API', err);
    yield put(validateOTPError({ status: false, error: err }));
    //yield put(push('/'));
  }
}

export function* sendOTP(data) {
  console.log('Send OTP request data', data);
  let isMobile = MOBILE_PATTERN.test(data.mobile) ? true : false;
  const otpData = isMobile ? data : { emailid: data.mobile, cuid: '' };
  //const requestURL = `${OTP_API_URL}send${isMobile ? '' : '/email'}`;
  const reqUrl = `${USER_SERVICE_API_URL}/authenticate/`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  };

  try {
    const repos = yield call(request, reqUrl, options);
    console.log('Data from send otp call', repos);
    yield put(sendOTPSuccess(repos));
    if (repos.success) {
      yield put(setShowModal(true));
    } else {
      // yield put(sendOTPError(repos));
    }
    // yield put(sendOTPSuccess(repos));
    // yield put(sendOTPSuccess({}));
  } catch (err) {
    console.log('Error from validate API', err);
    yield put(sendOTPError({ success: false, error: err }));
  }
}

export function* loginAPI(payload) {
  console.log('payload for login api', payload);
  const reqUrl = `${USER_SERVICE_API_URL}/contactibilities/${payload}`;
  const options = {
    method: 'GET',
  };
  try {
    const res = yield call(request, reqUrl, options);
    console.log('res from login api', res);
    if (res.success) {
      window.sessionStorage.setItem('cuid', JSON.stringify(res.cuid));
    }
  } catch (error) {}
}
