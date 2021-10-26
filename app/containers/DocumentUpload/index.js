/**
 *
 * DocumentUpload
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useForm } from 'react-hook-form';
import NextAction from 'containers/NextAction/Loadable';
import { Accordion, Card } from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import VerticalProgressBar from '../../components/VerticalProgressBar';
// import InputField from '../../components/InputField';
import CustomToggle from '../../components/CustomToggle';
import makeSelectDocumentUpload from './selectors';
import reducer from './reducer';
import saga from './saga';
import DocumentDropdown from '../DocumentDropdown/Loadable';
import ErrorMessage from '../../components/ErrorMessage';
import { fetchDocList, uploadFile } from './actions';
import { UIStages } from '../App/constants';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import OptionSelect from '../../components/OptionSelect';
// import InputField from '../../components/InputField';
import DocumentStatus from './DocumentStatus';
import Skelton from '../../components/Skelton';
import UserUploadedDocSection from '../UserUploadedDocSection/Loadable';
import makeSelectUserUploadedDocSection from '../UserUploadedDocSection/selectors';
import { DOCUMENTS_LIST } from './constants';

export function DocumentUpload({
  appDetails,
  documentUpload,
  getDocList,
  dispatch,
  userUploadedDoc,
}) {
  useInjectReducer({ key: 'documentUpload', reducer });
  useInjectSaga({ key: 'documentUpload', saga });

  const {
    register,
    handleSubmit,
    watch,
    errors,
    // formState,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const values = watch();

  console.log('Loan details form values', values);

  const [cuidArr, setCuidArr] = useState([]);
  const [selectedApplicantType, setSelectedApplicantType] = useState('');
  // const [pdfCheck, setPdfCheck] = React.useState(false);
  // const [passToggle, setPassToggle] = React.useState(false);

  useEffect(() => {
    if (appDetails && appDetails.appResponse) {
      const users = _.get(appDetails, 'appResponse.users') || [];
      if (users && users.length > 0) {
        const arr = users
          .filter(item => item.userLinked)
          .map(item => ({
            cuid: item.cuid,
            name: item.registeredName
              ? item.registeredName
              : `${item.firstName || ''} ${item.lastName || ''}`,
            type: _.get(item, 'appLMS.role', ''),
          }));
        setCuidArr(arr);
      } else {
        setCuidArr([]);
      }
    }
  }, [appDetails]);

  useEffect(() => {}, [documentUpload.uploadedList]);

  useEffect(() => {
    if (!_.get(values, 'applicant')) return;
    const cuid = _.get(values, 'applicant').split('-')[0];
    setSelectedApplicantType(
      _.get(cuidArr.find(ele => ele.cuid === cuid), 'type') === 'Applicant'
        ? 'app'
        : 'user',
    );
  }, [_.get(values, 'applicant')]);

  function handleFileChange(files) {
    console.log('files', files);
    // setFileData(true);
    // dispatch(
    //   uploadFile({
    //     file,
    //     docName,
    //     applicantDetails,
    //     count,
    //     setIsPhotoUploaded,
    //     setFileData,
    //   }),
    // );
  }

  const removeFile = fileIndex => {
    // If only 1 file is removed then reset the form else splice the array
    if (values.fileInput.length === 1) {
      reset();
      return;
    }
    const dt = new DataTransfer();
    const input = document.getElementById('addBankStatement');
    const { files } = input;
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (fileIndex !== i) dt.items.add(file); // here you exclude the file. thus removing it.
      input.files = dt.files;
      setValue('fileInput', dt.files);
    }
  };

  const checkIfUserHasOneKYCDoc = () => {
    if (
      userUploadedDoc.docList &&
      Object.keys(userUploadedDoc.docList).length > 0 &&
      cuidArr.length > 0
    ) {
      let flag = !_.isEmpty(userUploadedDoc.docList);
      Object.keys(userUploadedDoc.docList).forEach(cuid => {
        if (cuidArr.find(ele => ele.cuid === cuid && ele.type !== 'Applicant'))
          flag =
            userUploadedDoc.docList[cuid].length > 0 &&
            userUploadedDoc.docList[cuid].some(item =>
              DOCUMENTS_LIST.includes(item.type),
            );
      });
      return flag;
    }
    return !_.isEmpty(userUploadedDoc.docList);
  };

  const onSubmit = data => {
    const cuid = data.applicant.split('-')[0];
    dispatch(
      uploadFile({
        fileList: Array.from(data.fileInput),
        docName: data.documentName,
        cuid,
        type:
          _.get(cuidArr.find(ele => ele.cuid === cuid), 'type') === 'Applicant'
            ? 'user'
            : 'user',
      }),
    );
    setTimeout(() => {
      reset();
    }, 1000);
  };

  return (
    <div>
      <Helmet>
        <title>DocumentUpload</title>
        <meta name="description" content="Description of DocumentUpload" />
      </Helmet>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion defaultActiveKey="0" className="clix-accordion">
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="0">
                  <span className="icon">
                    <i className="clixicon-personal-info before" />
                  </span>
                  Document Upload
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="progress-form disbursal-bank-detail">
                  <Skelton loading={documentUpload.loading}>
                    <div className="progress-form-inn">
                      {/* ----------Loan details Application form starts below---------- */}
                      <form
                        className="clix-form cutomerVerifyForm"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <VerticalProgressBar values={values} errors={errors} />
                        <div className={`customer-verify-blk ${'active'}`}>
                          {cuidArr.map((item, index) => (
                            <>
                              <UserUploadedDocSection
                                cuid={item.cuid}
                                name={item.name}
                                type={item.type}
                                index={index}
                              />
                            </>
                          ))}
                          {/* {documentUpload.uploadedList.length > 0 &&
                            documentUpload.uploadedList.map((item, index) => (
                              <>
                                <DocumentStatus index={index + 1} item={item} />
                                <hr className="mt-4 mb-4" />
                              </>
                            ))} */}
                          <div className="row">
                            <div className="col col-12 col-md-6">
                              <OptionSelect
                                className="form-control clix-select custom-select"
                                id="applicant"
                                name="applicant"
                                options={
                                  cuidArr &&
                                  cuidArr.map(
                                    item => `${item.cuid}-${item.name}`,
                                  )
                                }
                                register={register({
                                  required: true,
                                  message: 'This field is required',
                                })}
                                errors={errors}
                                initialValue="Select Applicant"
                                labelHtml={
                                  <label htmlFor="applicant">
                                    Select Applicant
                                  </label>
                                }
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              <DocumentDropdown
                                selectedApplicantType={selectedApplicantType}
                                name="documentName"
                                errors={errors}
                                register={register({ required: true })}
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              {values.fileInput && values.fileInput.length > 0 && (
                                <div className="file-text d-flex align-items-center mb-2">
                                  <i className="clixicon-pdf-doc mr-1" />
                                  {values.fileInput[0].name}
                                  <a
                                    href="javascript:void(0);"
                                    className="file-cross"
                                    onClick={() => {
                                      removeFile(0);
                                    }}
                                  >
                                    <i className="clixicon-close" />
                                  </a>
                                </div>
                              )}

                              <div className="custom-file mb-3">
                                <input
                                  style={{ display: 'none' }}
                                  type="file"
                                  className="custom-file-input"
                                  // accept="application/pdf"
                                  id="addBankStatement"
                                  name="fileInput"
                                  multiple
                                  // disabled={!!bankStatementUpload.fileData}
                                  ref={register({
                                    required: true,
                                    minLength: 1,
                                  })}
                                  onChange={e =>
                                    handleFileChange(e.target.files)
                                  }
                                />
                                <label
                                  className="btn button btn-lg btn-linePrimary btn-block"
                                  htmlFor="addBankStatement"
                                >
                                  Add Document
                                </label>
                                <ErrorMessage
                                  name="fileInput"
                                  errors={errors}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row phone-hide-blk">
                            <div className="col col-12 col-md-6">
                              <button
                                className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                                type="submit"
                                // disabled={!formState.isValid}
                              >
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                        <NextAction
                          payload={{ uiStage: UIStages.LOAN_DOCUMENT_UPLOAD }}
                          show={checkIfUserHasOneKYCDoc()}
                        />
                      </form>
                    </div>
                  </Skelton>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

DocumentUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appDetails: PropTypes.object,
  documentUpload: PropTypes.object,
  userUploadedDoc: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  documentUpload: makeSelectDocumentUpload(),
  appDetails: makeSelectApplicationPage(),
  userUploadedDoc: makeSelectUserUploadedDocSection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDocList: data => dispatch(fetchDocList(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DocumentUpload);
