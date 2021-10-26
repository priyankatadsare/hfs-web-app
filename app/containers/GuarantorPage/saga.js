import { put, takeEvery, call, select, fork } from 'redux-saga/effects';
import request from 'utils/request';
import {
  API_URL,
  MASTER_API_URL,
  USER_SERVICE_API_URL,
} from 'containers/App/constants';
import _ from 'lodash';
import {
  userFetched,
  fetchUserFailed,
  fetchQualificationSuccess,
  fetchQualificationError,
  updateProfileForBothSuccess,
} from './actions';
import { LOAD_USER, FETCH_QUALIFICATION, UPDATE_PROFILE } from './constants';
import { updateApplication } from '../ApplicationPage/saga';
import makeSelectApplicationPage from '../ApplicationPage/selectors';

export function* checkAuthorize({ cuid }) {
  const requestURL = `${API_URL}/userservice/v2/users/${cuid}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    if (response.success) {
      yield put(userFetched(response.user));
    } else {
      yield put(fetchUserFailed(response.message));
    }
  } catch (error) {
    yield put(fetchUserFailed(error));
  }
}

function* fetchQualification() {
  const masterUrl = `${MASTER_API_URL}/get?masterType=QUALIFICATION_HFSAPP_HFS`;
  const options = {
    method: 'GET',
  };
  try {
    const response = yield call(request, masterUrl, options);
    if (response.success)
      yield put(fetchQualificationSuccess(response.masterData || []));
    else yield put(fetchQualificationError(response));
  } catch (error) {
    yield put(fetchQualificationError(error));
  }
}

function* updateProfile({ payload }) {
  try {
    // First update gurantor
    const profileUpdateRes = yield call(updateApplication, { payload });
    const belongsTo =
      payload.users[0].cuid ||
      _.get(
        profileUpdateRes.data,
        '[0].userServiceResponse[0].body.cuid',
        '',
      ) ||
      '';
    // Update main borrower
    const appDetails = yield select(makeSelectApplicationPage());

    // call user service of main applicant
    const mainApplicant = _.find(_.get(appDetails, 'appResponse.users', {}), {
      appLMS: { role: 'Applicant' },
    });
    const requestURL = `${USER_SERVICE_API_URL}/${mainApplicant.cuid}`;
    try {
      const res = yield call(request, requestURL);
      const belongsToId =
        _.get(
          _.find(res.user.entityOfficers, {
            belongsTo,
          }),
          'id',
          '',
        ) || '';
      const mainApplicantPayload = {
        users: [
          {
            id: mainApplicant.id,
            cuid: mainApplicant.cuid,
            entityOfficers: [
              {
                designation: _.get(
                  payload.users[0],
                  'entityOfficers[0].designation',
                ),
                belongsTo,
                id: belongsToId,
              },
            ],
          },
        ],
        appId: payload.appId,
      };
      yield fork(updateApplication, { payload: mainApplicantPayload });
      yield put(updateProfileForBothSuccess());
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* guarantorPageSaga() {
  yield takeEvery(LOAD_USER, checkAuthorize);
  yield takeEvery(FETCH_QUALIFICATION, fetchQualification);
  yield takeEvery(UPDATE_PROFILE, updateProfile);
}
