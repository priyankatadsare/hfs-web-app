import { call, put, takeEvery, select, fork } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'react-router-redux';
import {
  API_URL,
  COMPOSITE_APP_API_URL,
  APPLICATION_DOCUMENT_SERVICE,
  COMMERCIAL_BUREAU_API_URL,
  HUNTER_API_URL,
} from 'containers/App/constants';
import request from 'utils/request';
import {
  applicationLoaded,
  loadApplicationFailed,
  leadLoaded,
  leadLoadFailed,
  leadUpdated,
  leadUpdateFailed,
  appUpdated,
  appUpdateFailed,
} from './actions';
import {
  LOAD_APPLICATION_DETAILS,
  LOAD_APPLICATION_DETAILS_SUCCESS,
  UPDATE_LEAD_DETAILS,
  UPDATE_APP_DETAILS,
  CALL_BUREAU,
  CALL_SME_HUNTER,
  CALL_CONSUMER_HUNTER,
  CALL_COMMERCIAL_BUREAU,
} from './constants';
import makeSelectApplicationPage from './selectors';
import { bureauRequest } from './burreauRrequest';
import { commercialBureauRequest } from './commercialBureauRequestMapper';
import { uploadCibil } from './uploadCibiil';
import { consumerHunterRequest } from './consumerHunterRequest';
import { smeHunterRequest } from './smeHunterRequest';

const nextRoute = {
  BORROWER_DETAILS: 'gurantors',
  ASK_GUARANTOR: 'gurantors',
  GUARANTOR_DETAILS: 'loan_details',
  LOAN_DETAILS: 'banking',
  BANK_STATEMENT_UPLOAD: 'banking',
  BANK_STATEMENT_ANALYSIS: 'preview',
  PREVIEW_APPLICATION: 'offer',
  CREDIT_SUBMISSION: 'documents',
  LOAN_DOCUMENT_UPLOAD: 'success',
};

export function* fetchApplication({ appid }) {
  const requestURL = `${API_URL}/loanapplication/v2/apps/${appid}`;

  try {
    const response = yield call(request, requestURL);
    yield put(applicationLoaded(response.app));
  } catch (err) {
    yield put(loadApplicationFailed(err));
  }
}

export function* fetchLead() {
  const {
    appResponse: { customerLeadRefId },
  } = yield select(makeSelectApplicationPage());
  const requestURL = `${API_URL}/customerleadservice/v1/lead/${customerLeadRefId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(leadLoaded(response));
    const { location } = window;
    const { pathname } = location;
    const arr = pathname.split('/');
    const [one, two, three, ...rest] = arr;
    const next = nextRoute[response.details.uiStage];
    yield put(push([one, two, three, next].join('/')));
  } catch (err) {
    yield put(leadLoadFailed(err));
  }
}

export function* updateLead({ payload }) {
  const {
    appResponse: { customerLeadRefId },
  } = yield select(makeSelectApplicationPage());
  const requestURL = `${API_URL}/customerleadservice/v1/lead/${customerLeadRefId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    yield put(leadUpdated(response));
    const { location } = window;
    const { pathname } = location;
    const arr = pathname.split('/');
    const [one, two, three, ...rest] = arr;
    const next = nextRoute[payload.uiStage];
    yield put(push([one, two, three, next].join('/')));
  } catch (err) {
    yield put(leadUpdateFailed(err));
  }
}

export function* updateApplication({ payload }) {
  const reqUrl = COMPOSITE_APP_API_URL;
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
  };

  try {
    const response = yield call(request, reqUrl, options);
    yield put(appUpdated(response));
    return response;
  } catch (err) {
    yield put(appUpdateFailed(err));
  }
}

export function* callBureau({ applicant }) {
  const reqUrl = `${API_URL}/mbs/v1/score`;
  const options = {
    method: 'POST',
    body: JSON.stringify(bureauRequest(applicant)),
  };

  try {
    const response = yield call(request, reqUrl, options);
    yield call(uploadCibil, { response, cuid: applicant.cuid });
    // yield put(appUpdated(response));
  } catch (err) {
    // yield put(appUpdateFailed(err));
  }
}

export function* fileUpload({ data }) {
  const reqUrl = `${APPLICATION_DOCUMENT_SERVICE}/upload`;
  const {
    objId,
    objType,
    docType,
    fileName,
    fileAttributes,
    filestoBeSend,
  } = data;
  const fInalData = {
    objId,
    objType,
    docType,
    fileName,
    fileAttributes,
    files: [],
  };
  const fInalData2 = new FormData();
  fInalData2.append('file', filestoBeSend);
  const options = {
    method: 'POST',
    body: JSON.stringify(fInalData),
  };
  try {
    const response = yield call(request, reqUrl, options);

    if (response.status) {
      const optionsNew = {
        method: 'PUT',
        body: filestoBeSend,
      };
      const doNotCopyHeader = true;
      const response2 = yield call(
        request,
        response.data.presignedUrl,
        optionsNew,
        doNotCopyHeader,
      );
      if (response2) {
        return true;
      }
      return false;
    }
    return false;
  } catch (err) {
    alert('File uploaded successfully');
    return true;
  }
}

export function* callCommercialBureau({ payload }) {
  const {
    appResponse: { appId = '' },
  } = yield select(makeSelectApplicationPage());
  const reqUrl = `${COMMERCIAL_BUREAU_API_URL}/?cuid=${_.get(
    payload,
    'cuid',
    '',
  )}&applicationId=${appId}`;
  try {
    const response = yield call(request, reqUrl);
    // yield call(uploadCibil, { response, cuid: applicant.cuid });
    yield put(appUpdated(response));
  } catch (err) {
    yield put(appUpdateFailed(err));
  }
}

export function* callSmeHunter({ payload }) {
  const reqUrl = `${HUNTER_API_URL}/sme`;
  const options = {
    method: 'POST',
    body: JSON.stringify(smeHunterRequest(payload)),
  };

  try {
    const response = yield fork(request, reqUrl, options);
  } catch (err) {}
}

export function* callConsumerHunter({ payload }) {
  const reqUrl = `${HUNTER_API_URL}/consumer`;
  const options = {
    method: 'POST',
    body: JSON.stringify(consumerHunterRequest(payload)),
  };

  try {
    const response = yield fork(request, reqUrl, options);
  } catch (err) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* applicationPageSaga() {
  yield takeEvery(LOAD_APPLICATION_DETAILS, fetchApplication);
  yield takeEvery(LOAD_APPLICATION_DETAILS_SUCCESS, fetchLead);
  yield takeEvery(UPDATE_LEAD_DETAILS, updateLead);
  yield takeEvery(UPDATE_APP_DETAILS, updateApplication);
  yield takeEvery(CALL_BUREAU, callBureau);
  yield takeEvery(CALL_SME_HUNTER, callSmeHunter);
  yield takeEvery(CALL_CONSUMER_HUNTER, callConsumerHunter);
  yield takeEvery(CALL_COMMERCIAL_BUREAU, callCommercialBureau);
}
