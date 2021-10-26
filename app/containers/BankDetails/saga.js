import {
  call,
  put,
  debounce,
  takeEvery,
  all,
  takeLatest,
} from 'redux-saga/effects';
import request from 'utils/request';
import { v4 as uuidv4 } from 'uuid';
import {
  APP_DOCS_V2_API_URL,
  API_URL,
  STATEMENT_ANALYZER_API_URL,
} from '../App/constants';
import {
  banksFetched,
  banksFetchingError,
  startPerfiosSuccess,
  startPerfiosError,
  updatePerfiosList,
  setLoading,
  getPerfiosStatusSuccess,
  getPerfiosStatusError,
} from './actions';
import { FETCH_BANKS, START_PERFIOS, GET_PERFIOS_STATUS } from './constants';
import cookies from 'react-cookies';
import moment from 'moment';

export function* getBankNames() {
  const requestURL = `${API_URL}/sa/v1/institutions`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(banksFetched(response.institutionNameCodeMapping || {}));
  } catch (err) {
    yield put(banksFetchingError(err));
  }
}

/**
 *
 * @param {Map} params
 * @description Function to upload a file to DMS and get DMS id
 * @returns DMS ID of uploaded file
 */
export function* uploadDocumentDMS(params) {
  const reqUrl = `${APP_DOCS_V2_API_URL}/upload`;
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  };
  try {
    const response = yield call(request, reqUrl, options);
    // console.log('Response from Upload document to DMS APi', response);
    return response;
  } catch (error) {
    return error;
  }
}

export function* initiatePerfios({ payload, password, appId, fileList, cuid }) {
  // console.log('payload for perfios check', payload);
  // Upload fileList to DMS and get DMS ID to sent to perfios payload
  yield put(setLoading(true));
  const dmsArray = yield call(
    doSomethingWithAllItems,
    fileList,
    appId,
    password,
    cuid,
  );

  console.log('dmsArray', dmsArray);
  payload.bankDetail[0].documentObjIdList = dmsArray;
  payload.callBackURL = `${API_URL}/profiles/delphi`;

  const reqUrl = `${STATEMENT_ANALYZER_API_URL}/analysis/initiate`;
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
  };
  try {
    const perfiosRes = yield call(request, reqUrl, options);
    console.log('perfios response', perfiosRes);
    if (perfiosRes.success) {
      yield put(setLoading(false));
      yield put(startPerfiosSuccess(perfiosRes));
      const reqUrl = `${API_URL}/sa/v1/analysis/getanalysisstatus?value=${appId}`;
      const options = {
        method: 'GET',
      };
      try {
        const res = yield call(request, reqUrl, options);
        if (res && res.length > 0) {
          let arr = [];
          res
            .filter(item => item.transactionType == 'BANKSTATEMENT')
            .forEach(item => {
              arr.push({
                institutionCode:
                  item.bankDetails && item.bankDetails.institutionCode,
                yearMonthFrom:
                  item.bankDetails && item.bankDetails.yearMonthFrom,
                yearMonthTo: item.bankDetails && item.bankDetails.yearMonthTo,
                status: item.status,
              });
            });
          yield put(getPerfiosStatusSuccess(arr));
          return;
        }
        yield put(getPerfiosStatusError(`no record found for ${appId}`));
      } catch (error) {
        yield put(getPerfiosStatusError(`no record found for ${appId}`));
      }
    } else {
      yield put(setLoading(false));
      yield put(startPerfiosError(perfiosRes));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(startPerfiosError(error));
  }
}

/**
 *
 * @param {Blob} blob
 * @description Function to read data of File blob and return fileStream data
 */
function readAsText(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    if (blob) {
      reader.readAsDataURL(blob);
    }
  });
}

/**
 *
 * @param {File} item
 * @param {String} appId
 * @param {String} password
 * @description Wrappper Function to call upload File to DMS V1 function and provide necessary arguments
 */
function* doSomethingWithItem(item, appId, password, cuid) {
  // console.log('doSomethingWithItem', item);
  const content = yield call(readAsText, item);
  // console.log('content', content);
  // Make api call
  const stream = content.split('data:application/pdf;base64,')[1];
  const guid = uuidv4();
  const uploadDMSData = {
    objId: cuid,
    objType: 'user',
    docType: 'bank statement',
    fileName: `${cuid}-${item.name}`,
    fileAttributes: {
      isPasswordProtected: !!password,
      filePassword: password,
      cuid,
      guid,
    },
    files: [],
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(uploadDMSData),
  };
  const reqUrl = `${APP_DOCS_V2_API_URL}/upload`;
  try {
    const dmsResponse = yield call(request, reqUrl, options);
    if (dmsResponse.status) {
      debugger;
      const optionsNew = {
        method: 'PUT',
        body: item,
      };
      const doNotCopyHeader = true;
      const response2 = yield fetch(dmsResponse.data.presignedUrl, {
        ...optionsNew,
        doNotCopyHeader,
      });
      debugger;
      if (response2.status == 200) {
        return guid;
      }
    }
  } catch (error) {}
}

/**
 *
 * @param {Array<File>} items
 * @param {String} appId
 * @param {String} password
 * @description Function to iterate over List of Files and call wrapper function foe uploading
 */
function* doSomethingWithAllItems(items, appId, password, cuid) {
  return yield all(
    items.map(item => call(doSomethingWithItem, item, appId, password, cuid)),
  );
}

export function* getPerfiosStatus({ appId }) {
  const reqUrl = `${API_URL}/sa/v1/analysis/getanalysisstatus?value=${appId}`;
  const options = {
    method: 'GET',
  };

  try {
    const res = yield call(request, reqUrl, options);
    if (res && res.length > 0) {
      let arr = [];
      res
        .filter(item => item.transactionType == 'BANKSTATEMENT')
        .forEach(item => {
          arr.push({
            institutionCode:
              item.bankDetails && item.bankDetails.institutionCode,
            yearMonthFrom: item.bankDetails && item.bankDetails.yearMonthFrom,
            yearMonthTo: item.bankDetails && item.bankDetails.yearMonthTo,
            status: item.status,
          });
        });
      yield put(getPerfiosStatusSuccess(arr));
      return;
    }
    //message.error(`no record found for ${appId}`, 4);
    yield put(getPerfiosStatusError(`no record found for ${appId}`));
  } catch (error) {
    //message.error(`no record found for ${appId}`, 4);
    yield put(getPerfiosStatusError(`no record found for ${appId}`));
  }
}

export default function* bankDetailsSaga() {
  yield takeEvery(START_PERFIOS, initiatePerfios);
  yield debounce(500, FETCH_BANKS, getBankNames);
  yield takeLatest(GET_PERFIOS_STATUS, getPerfiosStatus);
}
