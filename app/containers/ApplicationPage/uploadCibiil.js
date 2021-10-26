import { fork, call } from 'redux-saga/effects';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';

export function* uploadCibil({ response, cuid }) {
  const actionForUpload = {
    payload: {
      file: { name: 'cibil_report.pdf' },
      type: 'user',
      id: cuid,
      docType: 'CIBIL Bureau Report',
      pdfFile: response.bureauResponse[0].pdfResponse,
      callFrom: 'entityDetails',
    },
  };
  try {
    yield call(uploadDoc, actionForUpload);
  } catch (err) {
    // yield put(uploadleadsDocFail(err));
  }
}

export function* uploadDoc(action) {
  const { pdfFile, callFrom } = action.payload;
  const file =
    callFrom === 'entityDetails'
      ? [pdfFile]
      : [action.payload.binaryData.split(',')[1]];
  const body = {
    objId: action.payload.id,
    objType: action.payload.type,
    docType: action.payload.docType,
    fileName: action.payload.file.name,
    fileAttributes: {
      isPasswordProtected: false,
      filePassword: 'yyyyMMdd',
      isDocumentActive: true,
    },
    files: file,
  };
  try {
    const result = yield fork(request, `${API_URL}/app-docs/v2/upload`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (callFrom === 'entityDetails') return result;
  } catch (err) {
    // yield put(uploadleadsDocFail(err));
  }
  return {};
}
