import { takeEvery, call, put, select, fork } from 'redux-saga/effects';
import request from 'utils/request';
import _ from 'lodash';
import moment from 'moment';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import {
  COMPOSITE_APP_API_URL,
  LEAD_API_URL,
  SCD_API_URL,
  UIStages,
} from '../App/constants';
import { createApplicationError, createApplicationSuccess } from './actions';
import { CREATE_NEW_APPLICATION } from './constants';
import makeSelectPanInput from '../PanInput/selectors';
import { updateLead as sagaUpdateLead } from '../ApplicationPage/saga';
import { appUpdated, updateLead } from '../ApplicationPage/actions';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import { toggleCommonErrorModal } from '../App/actions';

// Individual exports for testing
export default function* borrowerDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(CREATE_NEW_APPLICATION, createApp);
}

function* createApp({ payload }) {
  console.log('payload', payload);
  const panInput = yield select(makeSelectPanInput());
  const userId = yield select(makeSelectCurrentUser());

  // First check if lead aleady exists for given mobile number, if not then create app else not!
  const createLeadData = {
    mobile: payload.mobile,
    emailId: payload.email,
    data: {},
    sourcePartner: 'HFS',
    firstName: panInput.response.firstName || '',
    uiStage: UIStages.USER_CONSENT_PENDING,
  };
  const leadRes = yield call(createLead, { payload: createLeadData });
  if (leadRes && leadRes.success) {
    const { appid = false } = leadRes.details.data;
    // D2CP2-1326: removed condition to check if lead aleady exists for given mobile number
    // Create app

    const reqUrl = `${COMPOSITE_APP_API_URL}`;
    const appPayload = {
      users: [
        {
          type:
            payload.borrowerType === 'Individual' ? 'INDIVIDUAL' : 'COMPANY',
          firstName: panInput.response[payload.pan].firstName || '',
          lastName: panInput.response[payload.pan].lastName || '',
          middleName: panInput.response[payload.pan].middleName || '',
          userIdentities: {
            pan: payload.pan.toUpperCase(),
          },
          dateOfBirthIncorporation: moment(payload.dob, [
            'DD/MM/YYYY',
            'YYYY-MM-DD',
          ]).format('YYYY-MM-DD'),
          preferredEmail: payload.email,
          preferredPhone: payload.mobile,
          appLMS: {
            role: 'Applicant',
          },
        },
      ],
      product: 'HFS',
      partner: 'HFSAPP',
      scheme: '498',
      customerLeadRefId: leadRes.leadId,
    };
    if (payload.borrowerType.toUpperCase() === 'NON INDIVIDUAL') {
      appPayload.users[0].userDetails = {
        category:
          'MEDICAL AND DENTAL PRACTICE ACTIVITIES & OTHER HUMAN HEALTH ACTIVITIES',
      };
      appPayload.users[0].registeredName = `${panInput.response[payload.pan]
        .firstName || ''}${panInput.response[payload.pan].lastName ||
        ''}${panInput.response[payload.pan].middleName || ''}`;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(appPayload),
    };
    try {
      const appResponse = yield call(request, reqUrl, options);
      // console.log('nsdl response', nsdlResponse);
      if (appResponse) {
        // const cuid = response.data['userServiceResponse'][0].body.cuid;
        const cuid =
          _.get(
            appResponse.data[0].userServiceResponse,
            '[0].body.cuid',
            false,
          ) || false;
        const appId =
          _.get(appResponse.data[1].appServiceResponse, 'body.appid', false) ||
          false;
        yield put(appUpdated(appResponse));
        // Update lead
        if (appId) {
          // const leadData = {
          //   data: {
          //     appid: appId,
          //     userid: cuid,
          //     type: payload.borrowerType,
          //   },
          //   uiStage: UIStages.USER_CONSENT_PENDING,
          // };
          // yield put(updateLead(leadData));
          // Call basickcheck API in background
          const basicCheckData = {
            activity: 'OEM',
            state: '',
            actorId: userId,
            appId,
          };
          const basicCheckResponse = yield call(basicCheckAPI, {
            payload: basicCheckData,
          });
          // Update lead with serail Number of activity
          // const { leadResponse } = yield select(makeSelectApplicationPage());
          const leadData2 = {
            payload: {
              data: {
                appid: appId,
                userid: cuid,
                type: payload.borrowerType,
                activitySrlNo: basicCheckResponse.activitySrlNo,
              },
              uiStage: UIStages.USER_CONSENT_PENDING,
            },
          };
          yield call(sagaUpdateLead, leadData2);
          yield put(
            createApplicationSuccess({
              ...appResponse,
              appid: appId,
              // leadId,
              emailId: payload.email,
              typeOfBorrower: payload.borrowerType,
            }),
          );
          return;
        }
      }
      yield put(createApplicationError(appResponse));
    } catch (error) {
      yield put(createApplicationError(error));
    }
    // {
    //   // Show error/popup that application already exists
    //   yield put(createApplicationError());
    //   yield put(
    //     toggleCommonErrorModal({
    //       show: true,
    //       message: `Application already exists for mobile number ${
    //         payload.mobile
    //       }`,
    //     }),
    //   );
    // }
  }
}

function* createLead({ payload }) {
  console.log('leadData', payload);

  const reqUrl = `${LEAD_API_URL}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
  };
  try {
    const response = yield call(request, reqUrl, options);
    if (response.success) {
      return response;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// function* updateApplication({ payload }) {
//   console.log('updateAppPayload', payload);

//   const reqUrl = `${COMPOSITE_APP_API_URL}`;
//   const options = {
//     method: 'PUT',
//     body: JSON.stringify(payload),
//   };
//   try {
//     const response = yield call(request, reqUrl, options);
//     if (response) {
//       yield put(appUpdated(response));
//       return true;
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// }

function* basicCheckAPI({ payload }) {
  console.log('basicCheckAPIPayload', payload);

  const reqUrl = `${SCD_API_URL}/basicCheck`;
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
  };
  try {
    const response = yield call(request, reqUrl, options);
    if (response) {
      return response;
    }
    return false;
  } catch (error) {
    return false;
  }
}
