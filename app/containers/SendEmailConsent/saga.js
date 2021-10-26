import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { EMAIL_NOTIFICATION_API_URL } from '../App/constants';
import { sendEmailError, sendEmailSuccess } from './actions';
import { SEND_EMAIL } from './constants';
// Individual exports for testing
export default function* sendEmailConsentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(SEND_EMAIL, sendEmail);
}

function* sendEmail({ payload }) {
  const link = `https://develop.d3i7h9pkavlrdi.amplifyapp.com/#/v1/email/verification/${
    payload.appid
  }/${payload.cuid}`;
  const emailPayload = {
    applicationId: payload.appid,
    notificationType: 'TRANS',
    contentCode: 'HFS_CONSENT',
    source: 'HFS',
    personalizationData: {
      link,
    },
    to: [
      {
        emailid: payload.emailId,
      },
    ],
  };

  const reqUrl = EMAIL_NOTIFICATION_API_URL;

  const options = {
    method: 'POST',
    body: JSON.stringify(emailPayload),
  };

  try {
    const emailRes = yield call(request, reqUrl, options);
    if (emailRes.success) {
      yield put(sendEmailSuccess(emailRes));
      return;
    }
    yield put(sendEmailError({ emailRes, link }));
  } catch (error) {
    yield put(sendEmailError({ error, link }));
  }
}
