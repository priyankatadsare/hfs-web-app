import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { COMPOSITE_APP_API_URL, UIStages } from '../App/constants';
import { appUpdated } from '../ApplicationPage/actions';
import { updateLead } from '../ApplicationPage/saga';
import { updateApplicationError, updateApplicationSuccess } from './actions';
import { UPDATE_APP } from './constants';
// Individual exports for testing
export default function* loanDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(UPDATE_APP, updateApp);
}

function* updateApp({ payload }) {
  const reqUrl = COMPOSITE_APP_API_URL;
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
  };

  try {
    const appRes = yield call(request, reqUrl, options);
    if (appRes) {
      yield put(appUpdated(appRes));
      // Update lead
      const leadData = {
        uiStage: UIStages.BANK_STATEMENT_ANALYSIS,
      };
      // yield call(updateLead, { payload: leadData });
      yield put(updateApplicationSuccess());
      return;
    }
    yield put(updateApplicationError(appRes));
  } catch (error) {
    yield put(updateApplicationError(error));
  }
}
