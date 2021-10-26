import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { MOBILE_NOTIFICATION_API_URL } from '../App/constants';
import { sendMobileError, sendMobileSuccess } from './actions';
import { SEND_EMAIL } from './constants';
// Individual exports for testing
export default function* sendMobileConsentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(SEND_EMAIL, sendMobile);
}

function* sendMobile({ payload }) {
  const link = `https://develop.d3i7h9pkavlrdi.amplifyapp.com/#/v1/mobile/verification/${
    payload.appid
  }/${payload.cuid}`;
  const mobilePayload = {
    applicationId: payload.appid,
    notificationType: 'TRANS',
    contentCode: 'MORATORIUM_NOTIFICATION',
    personalizationData: {
      faq_link: link,
    },
    to: [
      {
        mobile: payload.mobile,
      },
    ],
    source: 'LAAS-EMAIL',
  };

  const reqUrl = MOBILE_NOTIFICATION_API_URL;

  const options = {
    method: 'POST',
    body: JSON.stringify(mobilePayload),
  };

  try {
    const mobileRes = yield call(request, reqUrl, options, true);
    if (mobileRes.success) {
      yield put(sendMobileSuccess(mobileRes));
      return;
    }
    yield put(sendMobileError({ mobileRes, link }));
  } catch (error) {
    yield put(sendMobileError({ error, link }));
  }
}
