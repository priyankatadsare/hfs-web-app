import { takeEvery, call, put, select, fork } from 'redux-saga/effects';
import request from 'utils/request';
import _ from 'lodash';
import { COMPOSITE_APP_API_URL, UIStages } from '../App/constants';
import { callCommercialBureau, updateLead } from '../ApplicationPage/saga';
import { updateApplicationError, updateApplicationSuccess } from './actions';
import { UPDATE_APP } from './constants';
import {
  applicationLoaded,
  callBureau,
  callConsumerHunter,
  callSmeHunter,
  updateApp,
} from '../ApplicationPage/actions';
import makeSelectApplicationPage from '../ApplicationPage/selectors';

export default function* borrowerDetailsPendingSectionSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(UPDATE_APP, updateData);
}

function* updateData({ payload }) {
  const reqUrl = COMPOSITE_APP_API_URL;
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
  };

  try {
    // const appRes = yield call(request, reqUrl, options);
    yield put(updateApp(payload));
    if (true) {
      // const app = _.get(appRes.data[1].appServiceResponse, 'body.app', {});
      // if (!_.isEmpty(app)) yield put(applicationLoaded(app));
      // Update lead
      const leadData = {
        uiStage: UIStages.ASK_GUARANTOR,
      };
      yield call(updateLead, { payload: leadData });
      // Call ASYNC Bureau
      const globalState = yield select(makeSelectApplicationPage());
      const { appId, users = [] } = globalState.appResponse || {};
      const currentUser = { ...users[0], ...payload.users[0] } || {};
      const typeOfBorrower = currentUser.type;
      if (typeOfBorrower === 'INDIVIDUAL') {
        // Call consumer bureau and hunter
        yield put(callBureau(currentUser));
        const hunterPayload = {
          appid: appId,
          cuid: currentUser.cuid,
          firstName: currentUser.firstName,
          dob: currentUser.dateOfBirthIncorporation,
        };
        yield put(callConsumerHunter(hunterPayload));
      } else {
        // Call commercial bureau and hunter
        // yield fork(callCommercialBureau(currentUser));
        const hunterPayload = {
          appid: appId,
          cuid: currentUser.cuid,
          registeredName: currentUser.registeredName,
        };
        yield put(callSmeHunter(hunterPayload));
      }
      yield put(updateApplicationSuccess());
      return;
    }
  } catch (error) {
    yield put(updateApplicationError(error));
  }
}
