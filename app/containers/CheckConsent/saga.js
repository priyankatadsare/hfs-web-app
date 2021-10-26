import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { LEAD_API_URL, UIStages } from '../App/constants';
import { loadApplicationDetails } from '../ApplicationPage/actions';
import { checkConsentError, checkConsentSuccess } from './actions';
import { CHECK_CONSENT } from './constants';
// Individual exports for testing
export default function* checkConsentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(CHECK_CONSENT, checkConsent);
}

function* checkConsent({ payload }) {
  const reqUrl = `${LEAD_API_URL}/${payload}`;

  try {
    const leadRes = yield call(request, reqUrl);
    if (leadRes.success) {
      const { uiStage, data } = leadRes.details;
      if (uiStage === UIStages.USER_CONSENT_GRANTED) {
        yield put(loadApplicationDetails(data.appid));
        yield put(checkConsentSuccess(uiStage));
        return;
      }
      yield put(checkConsentError());
    }
  } catch (error) {
    yield put(checkConsentError(error));
  }
}
