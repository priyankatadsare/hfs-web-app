import { takeEvery, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import _ from 'lodash';
import { APPLICATION_DOCUMENT_SERVICE } from '../App/constants';
import { fetchDocListSucccess, fetchDocListError } from './actions';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import { FETCH_DOC_LIST } from './constants';

// Individual exports for testing
export default function* userUploadedDocSectionSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(FETCH_DOC_LIST, fetchDocList);
}

export function* fetchDocList({ payload }) {
  const reqUrl = `${APPLICATION_DOCUMENT_SERVICE}/download`;
  const globalState = yield select(makeSelectApplicationPage());

  const { appId } = globalState.appResponse;

  const data = {
    objId: payload.cuid,
    objType: 'user',
    docType: '',
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  };

  try {
    const res = yield call(request, reqUrl, options);
    if (res.status) {
      const docList = !_.isEmpty(res.data)
        ? res.data.map(item => {
            const fileNameArr = _.get(item, 'asset.filename', '').split('/');
          return {
            fileName:
                fileNameArr && fileNameArr.length > 0
                  ? fileNameArr[fileNameArr.length - 1]
                  : '',
            type: item.asset.type,
          };
        })
        : [];
      yield put(
        fetchDocListSucccess({
          cuid: payload.cuid,
          docList: _.filter(docList, item => !item.type.toUpperCase().includes('CIBIL')),
        }),
      );
    } else {
      yield put(
        fetchDocListError({
          error: { message: 'Could not find any documents!' },
        }),
      );
    }
  } catch (error) {
    yield put(
      fetchDocListError({
        error,
      }),
    );
  }
}
