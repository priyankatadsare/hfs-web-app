import _ from 'lodash';
import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { MY_ACCOUNT_API_URL } from 'containers/App/constants';
import makeSelectUserProfile from 'containers/UserProfile/selectors';
import {
  applicationsFetched,
  applicationFetchingError,
  createRLA_applicationError,
  createRLA_applicationSuccess,
  fetchAppDetailsSuccess,
  fetchAppDetailsError,
  getMasterRulesSuccess,
  getMasterRulesError,
  createLeadSuccess,
  createLeadError,
  fetchLanDetailsError,
  fetchLanDetailsSuccess,
} from './actions';

import {
  GET_LOAN_APPLICATIONS,
  GET_APP_DETAIL,
  CREATE_RLA_APPLICATION,
  MASTER_GET_RULES,
  CREATE_LEAD,
  FETCH_LAN_DETAILS,
} from './constants';

import request from 'utils/request';
import makeSelectLoanApplications from './selectors';
import {
  APP_SERVICE_API_URL,
  LEAD_API_URL,
  RLA_PORTAL_URL,
  MASTER_API_URL,
  DELPHI_API_URL,
} from '../App/constants';
import appServiceRequest from './appServiceRequest';

const individualLoans = [
  'CD',
  'PL',
  'TW',
  'CL',
  'PERSONAL',
  'AUTOMOBILE',
  'CONSDUR',
];
const non_individualLoans = ['BL', 'LAEP', 'BUSINESSL', 'LACR', 'HL'];

/**
 * Github repos request/response handler
 */
export function* fetachloanApplications() {
  // { cuid = 1000051583 }
  const cuid = JSON.parse(sessionStorage.getItem('cuid'));
  // Select username from store
  const { response } = yield select(makeSelectLoanApplications());
  if (response) {
    yield put(applicationsFetched(response));
  }
  const requestURL = `${MY_ACCOUNT_API_URL}/selfservice/v1/myaccount/${cuid}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(applicationsFetched(response));
  } catch (err) {
    yield put(applicationFetchingError(err));
  }
}

export function* initiateRLA_application({ payload }) {
  console.log('payload for initiateRLA_application', payload);
  const userResponse = yield select(makeSelectUserProfile());
  const phoneNumber = _.get(
    _.reject(
      userResponse.response.contactibilities,
      contact => !contact.phoneNumber,
    ),
    '[0][phoneNumber]',
  );
  let mobile =
    JSON.parse(window.sessionStorage.getItem('mobile')) || phoneNumber;
  let emailId = JSON.parse(window.sessionStorage.getItem('email')) || '';
  let leadData = {
    mobile,
    emailId,
    data: {
      cuid: payload.cuid,
    },
    cuid: payload.cuid || '',
    sourcePartner: 'RLA',
    firstName: '',
    uiStage: '1.1',
    optionalId: payload.lan,
  };
  const leadRes = yield call(createRLA_lead, leadData);
  //debugger;
  if (leadRes && leadRes.success) {
    const { appid } = leadRes.details.data;
    if (!appid) {
      //GET APPLICATION DATA such as bankdetails, UMRM details etc... and then create application
      const appRes = yield call(getApplicationData, payload.appid);
      //GET COMPANY-TYPE Cuid and save in lead
      const companyCuid = _.get(
        _.find(appRes.app.users, {
          type: 'Company',
        }),
        'cuid',
      );
      //debugger;
      if (appRes && appRes.success) {
        const { app } = appRes;
        //payload for creating new Application
        const appData = appServiceRequest({
          app,
          leadId: leadRes.leadId,
          cuid: companyCuid ? companyCuid : payload.cuid,
          lan: payload.lan,
          lmsSystem: payload.lmsSystem,
        });
        const createAppResponse = yield call(createRLA_application, appData);
        //debugger;
        if (createAppResponse && createAppResponse.success) {
          //Check Loan Type Individual or Non-Individual
          let isIndividual = individualLoans.includes(app.product)
            ? true
            : false;
          //Update Lead with new appid
          const data = {
            data: {
              cuid: companyCuid ? companyCuid : payload.cuid,
              appid: createAppResponse.app.appId,
              type: isIndividual ? 'Individual' : 'Non-Individual',
              lmsSystem: payload.lmsSystem || '',
              optionalId: payload.lan,
            },
            uiStage: '1.1',
          };
          const updateLeadRes = yield call(updateLead, data, leadRes.leadId);
          //Redirect to RLA Portal
          delay(1000);
          window.location = `${RLA_PORTAL_URL}?id=${leadRes.leadId}`; //Replace id with leadId here
          yield put(createRLA_applicationSuccess());
        }
      }
    } else {
      //Redirect to RLA Portal
      delay(1000);
      window.location = `${RLA_PORTAL_URL}?id=${leadRes.leadId}`; //Replace id with leadId here
      yield put(createRLA_applicationSuccess());
    }
  } else {
    yield put(createRLA_applicationError());
  }
}

export function* createRLA_lead(params) {
  console.log('params for create RLA Lead', params);
  const requestURL = `${LEAD_API_URL}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  };

  try {
    const res = yield call(request, requestURL, options);
    return res;
  } catch (error) {
    return false;
  }
}

export function* updateLead(params, leadId) {
  const requestURL = `${LEAD_API_URL}/${leadId}`;
  try {
    // Call our request helper (see 'utils/request')
    const res = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(params),
    });
    return res;
  } catch (err) {
    return false;
  }
}

export function* createRLA_application(params) {
  console.log('params for create RLA Lead', params);
  const requestURL = `${APP_SERVICE_API_URL}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  };

  try {
    const res = yield call(request, requestURL, options);
    return res;
  } catch (error) {
    return false;
  }
}

export function* getApplicationData(appid) {
  console.log('appid for get App details', appid);
  const requestURL = `${APP_SERVICE_API_URL}/${appid}`;
  const options = {
    method: 'GET',
  };

  try {
    const res = yield call(request, requestURL, options);
    return res;
  } catch (error) {
    return false;
  }
}

export function* fetchAppDetails(action) {
  // { cuid = 1000051583 }
  const appId = action.appId;
  const requestURL = `${MY_ACCOUNT_API_URL}/loanapplication/v2/apps/${appId}`;
  console.log('appId', appId);
  try {
    const response = yield call(request, requestURL);
    yield put(fetchAppDetailsSuccess(response));
  } catch (err) {
    yield put(fetchAppDetailsError(err));
  }
}

export function* getMasterRules({ payload }) {
  const requestURL = `${MASTER_API_URL}/get?masterType=NEGETIVELIST_RLA&cmCode=${payload}`;
  const options = {
    method: 'GET',
  };
  try {
    const response = yield call(request, requestURL, options);
    if (response.masterData && response.masterData.length > 0) {
      yield put(getMasterRulesSuccess(response));
      return;
    }
    yield put(getMasterRulesError());
  } catch (err) {
    yield put(getMasterRulesError(err));
  }
}

export function* createLead({ payload }) {
  console.log('payload', payload);
  const leadRes = yield call(createRLA_lead, payload);
  if (!leadRes) yield put(createLeadError());
  yield put(createLeadSuccess(leadRes));
}

/**
 * Function to fetch lan details for a given lanId and lmsSystem
 * @param {String} lanId
 */
export function* fetchLanDetails({ payload }) {
  const requestURL = `${DELPHI_API_URL}/fetch/lan/details?lan=${
    payload.lan
  }&lms=${payload.lmsSystem}`;
  const options = {
    method: 'GET',
  };
  try {
    const res = yield call(request, requestURL, options);
    console.log('res getExistingLoanDetails', res);
    yield put(fetchLanDetailsSuccess(res));
  } catch (error) {
    yield put(fetchLanDetailsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loanApplicationsSaga() {
  yield takeEvery(GET_LOAN_APPLICATIONS, fetachloanApplications);
  yield takeEvery(CREATE_RLA_APPLICATION, initiateRLA_application);
  yield takeEvery(GET_APP_DETAIL, fetchAppDetails);
  yield takeEvery(MASTER_GET_RULES, getMasterRules);
  yield takeEvery(CREATE_LEAD, createLead);
  yield takeEvery(FETCH_LAN_DETAILS, fetchLanDetails);
}
