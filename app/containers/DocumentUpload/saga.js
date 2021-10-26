import { takeEvery, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { APPLICATION_DOCUMENT_SERVICE } from '../App/constants';
import { fileUpload } from '../ApplicationPage/saga';
import { fetchDocList } from '../UserUploadedDocSection/actions';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import { uploadFileSuccess } from './actions';
import { FETCH_DOC_LIST, FILE_UPLOAD } from './constants';

// Individual exports for testing
export default function* documentUploadSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(FILE_UPLOAD, fileUploadSaga);
  // yield takeEvery(FETCH_DOC_LIST, fetchDocList);
}

export function* fileUploadSaga({ payload }) {
  const { fileList, docName, cuid, type } = payload;
  const globalState = yield select(makeSelectApplicationPage());

  const { appId } = globalState.appResponse;

  const fileDataUpdated = {
    objId: cuid,
    objType: type,
    docType: docName,
    fileName: fileList[0].name,
    fileAttributes: {},
    filestoBeSend: fileList[0],
    files: [],
  };
  const status = yield call(fileUpload, { data: fileDataUpdated });

  yield put(
    uploadFileSuccess({
      docType: docName,
      fileName: fileList[0].name,
      status,
    }),
  );
  yield put(fetchDocList({ cuid, type: type === 'app' ? 'Applicant' : '' }));
}

// export function* fetchDocList({ payload }) {
//   const reqUrl = `${APPLICATION_DOCUMENT_SERVICE}/download`;

//   const options = {
//     method: 'POST',
//     body: JSON.stringify(payload),
//   };

//   try {
//     const res = yield call(request, reqUrl, options);
//     if (res.status) {
//       yield put(
//         uploadFileSuccess({
//           docType: docName,
//           fileName: fileList[0].name,
//           status,
//         }),
//       );
//     }
//   } catch (error) {}
// }
