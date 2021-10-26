/**
 *
 * BankDetails
 *
 */

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import cookies from 'react-cookies';

import NextAction from 'containers/NextAction/Loadable';
import VerticalProgressBar from 'components/VerticalProgressBar';
import InputField from 'components/InputField';
import CustomToggle from 'components/CustomToggle';
import Skelton from 'components/Skelton';
import ErrorMessage from 'components/ErrorMessage';
import { Accordion, Card } from 'react-bootstrap';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { updateApp } from 'containers/ApplicationPage/actions';
import OptionsSelect from '../../components/OptionSelect';
import {
  fetchBanks,
  startPerfios,
  setPassword,
  getPerfiosStatus,
} from './actions';
import makeSelectBankDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import PerfiosStatus from './PerfiosStatus';

import { UIStages, NUMBER_PATTERN } from '../App/constants';

export function BankDetails({ dispatch, appDetails, bankDetails }) {
  useInjectReducer({ key: 'bankDetails', reducer });
  useInjectSaga({ key: 'bankDetails', saga });

  const [pdfCheck, setPdfCheck] = React.useState(false);
  const [passToggle, setPassToggle] = React.useState(false);
  const appId = _.get(appDetails, 'appResponse.appId', {});
  const mainApplicant =
    _.find(_.get(appDetails, 'appResponse.users', []), {
      appLMS: { role: 'Applicant' },
    }) || {};

  useEffect(() => {
    dispatch(fetchBanks());
  }, []);

  const handleFetchBanks = term => {
    if (term.length > 2) {
      dispatch(fetchBanks(term));
    }
  };

  const perfiosAbbreviations = {
    CTD: 'Transaction created',
    FAIL: 'Transaction failed',
    CNCD: 'Connected data for Analysis initiation',
    UPLD: 'All documents uploaded for analysis',
    NBCT: 'Transaction created for netbanking',
    NBF: 'Transaction for netbanking failed',
    NBC: 'Transaction for netbanking completed',
    CNBC: 'Client completed the netbanking',
  };

  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState,
    setValue,
    setError,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      bankDetail: _.get(appDetails, 'appResponse.bankDetail', {}),
      toDate: moment()
        .subtract(1, 'months')
        .format('YYYY-MM'),
      fromDate: moment()
        .subtract(6, 'months')
        .format('YYYY-MM'),
    },
  });

  const values = watch();

  const [cuidArr, setCuidArr] = useState([]);
  const [addStatement, setAddStatement] = useState(false);
  const [addMore, setAddMore] = useState(false);

  const entityUser = _.find(_.get(appDetails, 'appResponse.users', []), {
    type: 'COMPANY',
  });

  useEffect(() => {
    if (appDetails && appDetails.appResponse) {
      const users = _.get(appDetails, 'appResponse.users') || [];
      if (users && users.length > 0) {
        let arr = [];
        if (_.get(mainApplicant, 'corporateStructure') === 'Proprietorship') {
          arr = users
            .filter(
              item =>
                item.userLinked &&
                _.get(item, 'userIdentities.pan', '') ===
                  _.get(mainApplicant, 'userIdentities.pan', ''),
            )
            .map(item => ({
              cuid: item.cuid,
              name: item.registeredName
                ? item.registeredName
                : `${item.firstName || ''} ${item.lastName || ''}`,
            }));
        } else {
          arr = users
            .filter(
              item =>
                item.userLinked && _.get(item, 'appLMS.role') === 'Applicant',
            )
            .map(item => ({
              cuid: item.cuid,
              name: item.registeredName
                ? item.registeredName
                : `${item.firstName || ''} ${item.lastName || ''}`,
            }));
        }
        setCuidArr(arr);
      } else {
        setCuidArr([]);
      }
      dispatch(getPerfiosStatus(appId));
    }
  }, [appDetails]);

  useEffect(() => {
    if (bankDetails.perfiosStatus.length == 0) {
      setAddStatement(false);
      setAddMore(true);
    }
    if (bankDetails.perfiosStatus.length > 0) {
      setAddStatement(true);
      setAddMore(true);
    }
    if (bankDetails.perfiosStatus.length >= 3) {
      setAddMore(false);
    }
  }, [bankDetails]);

  const { loading, error } = bankDetails;
  //   const gurantors = _.filter(_.get(appDetails, 'appResponse', {}), {type: 'GUARANTOR'});
  const { uiStage } = _.get(appDetails, 'leadResponse.details', {});
  // const { appBankDetails } = _.get(appDetails, 'leadResponse.bankDetails', {});
  const bankNameOptions = () =>
    Object.keys(_.get(bankDetails, 'response.banks', {})).map(bank => bank) ||
    [];

  // const bankNameOptions = () => [
  //   'ADCB,India',
  //   'AUSmallFinanceBank,India',
  //   'ANZBank,India',
  // ];

  function getBankOptionList() {
    const banksList = [];
    banksList.push(
      <option disabled value selected key="select your bank">
        Select your Salary Bank
      </option>,
    );
    for (const [key, value] of Object.entries(
      _.get(bankDetails, 'response.banks', {}),
    )) {
      // console.log(key, value);
      banksList.push(
        <option key={key} value={value}>
          {key}
        </option>,
      );
    }
    return banksList;
  }

  const handleFileChange = files => {
    console.log('files', files);
    if (files.length > 6) {
      reset();
      setError(
        'fileInput',
        'pattern',
        'Maximum 6 files can be added only. Please try again',
      );
    }
  };

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

  const bankDetail = _.get(appDetails, 'appResponse.bankDetail');

  useEffect(() => {
    if (bankDetail) {
      reset({ bankDetail });
    }
  }, [bankDetail]);

  const onSubmit = data => {
    if (data.bankVal === 'true') {
      return setError('bankVal', 'required', 'Please choose a bank');
    }
    if (Array.from(data.fileInput).length > 6) {
      return setError(
        'fileInput',
        'pattern',
        'Maximum 6 files can be added only. Please try again',
      );
    }
    dispatch(setPassword(data.pdfpass));
    // Send for perfios
    const fromDate = moment(data.fromDate).format('YYYY-MM');
    const toDate = moment(data.toDate).format('YYYY-MM');

    const uploadData = {
      appId: _.get(appDetails, 'appResponse.appId', {}),
      transactionCode: '',
      source: 'LOS-CLIX',
      facility:
        data.bankDetail.disbursmentAccType.toUpperCase() == 'CURRENT' ||
        data.bankDetail.disbursmentAccType.toUpperCase() == 'SAVINGS'
          ? 'NONE'
          : data.bankDetail.disbursmentAccType.toUpperCase(), // !isNoEntity ? data.accountType.toUpperCase() : '',
      applicant: {
        cuid: data.applicant.split('-')[0] || '',
        applicantName: data.bankDetail.disbursmentAccHolderName || '',
        emailId: _.get(entityUser, 'preferredEmail', '') || '', // entityEmail
        employementType: 'SELF_EMPLOYED', // ?
        employerName: '', // ? kamlesh?--
        pan: _.get(entityUser, 'userIdentities.pan', '') || '',
        sisterCompanyNames: [],
        companyNames: [],
      },
      loanDetails: {
        loanAmount:
          _.get(
            _.filter(_.get(appDetails, 'appResponse.loanOffers', {}), {
              type: 'eligible_amount',
            }),
            '[0].loanAmount',
          ) || '100001',
        loanDuration: '48',
        loanType: 'BUSINESS_LOAN', // as HFS will be a buisness loan
        sanctionLimitFixed: false,
        sanctionLimitFixedAmount: '',
        sanctionLimitVariableAmounts: data.sanctionLimit
          ? [data.sanctionLimit.toString()]
          : [],

        // drawingPowerVariableAmounts:
        //   data.drawingPower && data.accountType === 'CC'
        //     ? [data.drawingPower.toString()]
        //     : [],
      },
      bankDetail: [
        {
          yearMonthFrom: fromDate,
          yearMonthTo: toDate,
          correlationId: '',
          institutionCode:
            bankDetails.response.banks[data.bankDetail.disbursmentBankName],
          scannedStatement: false,
          documentObjIdList: [],
        },
      ],
    };
    dispatch(
      startPerfios({
        payload: uploadData,
        password: data.pdfpass || '',
        appId: _.get(appDetails, 'appResponse.appId', {}),
        fileList: Array.from(data.fileInput),
        cuid: data.applicant.split('-')[0],
      }),
    );

    setTimeout(() => {
      reset();
    }, 1000);
    // dispatch(
    //   updateApp({
    //     bankDetail: {
    //       ...data.bankDetail,
    //       id: _.get(appDetails, 'appResponse.bankDetail.id', ''),
    //     },
    //     appId: _.get(appDetails, 'appResponse.appId', {}),
    //   }),
    // );
  };

  const getAccountTypeOptions = () => {
    const applicant =
      _.find(_.get(appDetails, 'appResponse.users', []), {
        appLMS: { role: 'Applicant' },
      }) || {};
    if (
      applicant.type === 'INDIVIDUAL' ||
      applicant.corporateStructure === 'Proprietorship'
    ) {
      return ['CC', 'OD', 'Current', 'Savings'];
    }
    return ['CC', 'OD', 'Current'];
  };

  const handleDisableApplicant = () => {
    return (
      cuidArr &&
      cuidArr.length > 0 &&
      mainApplicant.corporateStructure === 'Propreitorship'
    );
  };

  return (
    <Skelton loading={loading} error={error}>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion defaultActiveKey="0" className="clix-accordion">
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="0">
                  <span className="icon">
                    <i className="clixicon-personal-info before" />
                  </span>
                  {uiStage === UIStages.BANK_STATEMENT_UPLOAD
                    ? 'Fill Bank Details'
                    : 'Bank Details'}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="progress-form disbursal-bank-detail">
                  <div className="progress-form-inn">
                    <form
                      className="clix-form cutomerVerifyForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <VerticalProgressBar values={values} errors={errors} />
                      <div className={`customer-verify-blk ${'active'}`}>
                        {bankDetails.perfiosStatus.length > 0 &&
                          bankDetails.perfiosStatus.map((item, index) => (
                            <>
                              <PerfiosStatus
                                index={index + 1}
                                item={item}
                                perfiosAbbreviations={perfiosAbbreviations}
                              />
                              <hr className="mt-4 mb-4" />
                            </>
                          ))}
                        {addMore && addStatement ? (
                          <div
                            className="row justify-content-between"
                            style={{ padding: '1rem' }}
                          >
                            <button
                              type="button"
                              style={{ float: 'left' }}
                              className="btn button btn-lg button-primary"
                              onClick={e => {
                                e.preventDefault();
                                setAddStatement(false);
                              }}
                            >
                              Add Statement
                            </button>
                          </div>
                        ) : null}
                        {!addStatement && addMore ? (
                          <>
                            <div
                              className="row justify-content-between"
                              style={{ padding: '1rem' }}
                            >
                              {bankDetails.perfiosStatus.length ? (
                                <button
                                  type="button"
                                  style={{ float: 'left' }}
                                  className="btn button  button-secondary"
                                  onClick={e => {
                                    e.preventDefault();
                                    setAddStatement(true);
                                  }}
                                >
                                  Cancel
                                </button>
                              ) : null}
                            </div>
                            <div className="row">
                              <div className="col col-12 col-md-6">
                                <OptionsSelect
                                  className="form-control clix-select custom-select"
                                  id="bankDetail.disbursmentBankName"
                                  name="bankDetail.disbursmentBankName"
                                  onSearch={handleFetchBanks}
                                  options={bankNameOptions()}
                                  showSearch
                                  register={register({
                                    required: true,
                                    message: 'This field is required',
                                  })}
                                  errors={errors}
                                  initialValue="Select Bank Name"
                                  labelHtml={
                                    <label htmlFor="bankDetail.disbursmentBankName">
                                      Bank Name
                                    </label>
                                  }
                                />
                                {/* <div className="form-group has-float-label">
                            <label htmlFor="workex">
                              Select your Salary Bank
                            </label>
                            <select
                              className="form-control clix-select SlectBox"
                              name="bankVal"
                              ref={register({ required: true })}
                              onChange={e => {
                                e.target.value
                                  ? e.target.offsetParent.classList.add(
                                    'populated',
                                  ) && clearError('bankVal')
                                  : e.target.offsetParent.classList.remove(
                                    'populated',
                                    );
                              }}
                              onFocus={e => {
                                e.target.offsetParent.classList.add(
                                  'populated',
                                );
                              }}
                              onBlur={e => {
                                e.target.value == 'Select your Salary Bank'
                                  ? e.target.offsetParent.classList.remove(
                                    'populated',
                                    )
                                  : '';
                              }}
                            >
                              {getBankOptionList()}
                            </select> */}
                                {/* <ErrorMessage name="bankVal" errors={errors} /> */}
                                {/* </div> */}
                              </div>
                              <div className="col col-12 col-md-6">
                                <OptionsSelect
                                  className="form-control clix-select custom-select"
                                  id="bankDetail.disbursmentAccType"
                                  name="bankDetail.disbursmentAccType"
                                  options={getAccountTypeOptions()}
                                  showSearch
                                  register={register({
                                    required: true,
                                    message: 'This field is required',
                                  })}
                                  errors={errors}
                                  initialValue="Select Account Type"
                                  labelHtml={
                                    <label htmlFor="bankDetail.disbursmentAccType">
                                      Account Type
                                    </label>
                                  }
                                />
                              </div>
                              <div className="col col-12 col-md-6">
                                <OptionsSelect
                                  className="form-control clix-select custom-select"
                                  id="applicant"
                                  name="applicant"
                                  options={
                                    cuidArr &&
                                    cuidArr.map(
                                      item => `${item.cuid}-${item.name}`,
                                    )
                                  }
                                  disabled={handleDisableApplicant}
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
                                {/* <InputField
                                  className="form-control"
                                  id="applicant"
                                  name="applicant"
                                  register={register({
                                    required: true,
                                  })}
                                  value={`${_.get(cuidArr, '[0].cuid')}-${_.get(
                                    cuidArr,
                                    '[0].name',
                                  )}`}
                                  disabled={handleDisableApplicant}
                                  type="text"
                                  errors={errors}
                                  placeholder="Applicant Name"
                                  labelHtml={
                                    <label htmlFor="applicant">
                                      Applicant Name
                                    </label>
                                  }
                                /> */}
                              </div>
                              <div className="col col-12 col-md-6">
                                <InputField
                                  className="form-control"
                                  id="disbursmentAccNumber"
                                  name="disbursmentAccNumber"
                                  register={register({
                                    required: true,
                                    pattern: {
                                      value: NUMBER_PATTERN,
                                      message: 'Invalid Account Number',
                                    },
                                    maxLength: {
                                      value: 22,
                                      message: 'MaxLength 22 is allowed',
                                    },
                                  })}
                                  type="text"
                                  errors={errors}
                                  placeholder="Account Number"
                                  labelHtml={
                                    <label htmlFor="disbursmentAccNumber">
                                      Account Number
                                    </label>
                                  }
                                />
                              </div>
                              <div className="col col-12 col-md-6">
                                <InputField
                                  className="form-control"
                                  id="bankDetail.disbursmentAccHolderName"
                                  name="bankDetail.disbursmentAccHolderName"
                                  register={register({
                                    required: true,
                                  })}
                                  type="text"
                                  errors={errors}
                                  placeholder="Account Holder Name"
                                  labelHtml={
                                    <label htmlFor="bankDetail.disbursmentAccHolderName">
                                      Account Holder Name
                                    </label>
                                  }
                                />
                              </div>
                              {(values['bankDetail.disbursmentAccType'] ==
                                'OD' ||
                                values['bankDetail.disbursmentAccType'] ==
                                  'CC') && (
                                <div className="col col-12 col-md-6">
                                  <InputField
                                    className="form-control"
                                    id="sanctionLimit"
                                    name="sanctionLimit"
                                    register={register({
                                      required: false,
                                    })}
                                    type="number"
                                    errors={errors}
                                    placeholder="Sanction Limit"
                                    labelHtml={<label>Sanction Limit</label>}
                                  />
                                </div>
                              )}
                              <div className="col col-12 col-md-6">
                                <InputField
                                  className="form-control"
                                  id="fromDate"
                                  name="fromDate"
                                  //disabled
                                  register={register({
                                    required: true,
                                  })}
                                  type="month"
                                  errors={errors}
                                  placeholder="From Date"
                                  labelHtml={<label>From Date</label>}
                                />
                              </div>
                              <div className="col col-12 col-md-6">
                                <InputField
                                  className="form-control"
                                  id="toDate"
                                  name="toDate"
                                  //disabled
                                  register={register({
                                    required: true,
                                  })}
                                  type="month"
                                  errors={errors}
                                  placeholder="To Date"
                                  labelHtml={<label>To Date</label>}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col col-12 col-md-6">
                                <label htmlFor="fileInput">
                                  Upload Bank statement in PDF Format of last
                                  completed 6 months
                                </label>
                                {values.fileInput &&
                                  values.fileInput.length > 0 &&
                                  Array.from(values.fileInput).map(
                                    (item, index) => (
                                      <div className="file-text d-flex align-items-center mb-2">
                                        <i className="clixicon-pdf-doc mr-1" />
                                        {item.name}
                                        <a
                                          href="javascript:void(0);"
                                          className="file-cross"
                                          onClick={() => {
                                            removeFile(index);
                                          }}
                                        >
                                          <i className="clixicon-close" />
                                        </a>
                                      </div>
                                    ),
                                  )}
                                {/* <InputField
                            className="form-control"
                            id="fileInput"
                            name="fileInput"
                            register={register({
                              required: true,
                              minLength: 1,
                            })}
                            type="file"
                            accept="application/pdf"
                            multiple
                            errors={errors}
                            placeholder="Upload Bank Statements"
                            onChange={e => handleFileChange(e)}
                          /> */}
                                <div className="custom-file mb-3">
                                  <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    className="custom-file-input"
                                    accept="application/pdf"
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
                                    Add Bank Statement
                                  </label>
                                  <ErrorMessage
                                    name="fileInput"
                                    errors={errors}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col col-12 col-md-6">
                                <div className="custom-pdfCheck">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="pdfCheck"
                                    checked={pdfCheck}
                                    onChange={e => {
                                      // console.log('pdfCheck values', e.target.value);
                                      setPdfCheck(!pdfCheck);
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="pdfCheck"
                                  >
                                    PDF bank statements are password protected
                                  </label>
                                </div>
                                {pdfCheck && (
                                  <InputField
                                    className="form-control"
                                    id="pdfpass"
                                    name="pdfpass"
                                    type={passToggle ? 'text' : 'password'}
                                    placeholder="PDF Password"
                                    errors={errors}
                                    register={register({
                                      required: !!pdfCheck,
                                    })}
                                    wrapperClassname="input-group"
                                    labelHtml={
                                      <label htmlFor="pdfpass">
                                        PDF Password
                                      </label>
                                    }
                                    postfix={
                                      <>
                                        <div className="input-group-addon">
                                          <span
                                            className="eye-click"
                                            onClick={() =>
                                              setPassToggle(!passToggle)
                                            }
                                          >
                                            <i
                                              className={
                                                passToggle
                                                  ? 'clixicon-eye'
                                                  : 'clixicon-eye-cross'
                                              }
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                      </>
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className="row phone-hide-blk">
                              <div className="col col-12 col-md-6">
                                <button
                                  className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                                  type="submit"
                                  disabled={!formState.isValid}
                                >
                                  Initiate Bank Analysis
                                </button>
                                <div className="notes d-flex mt-2">
                                  <div>
                                    <i className="clixicon-pdfFormat mr-2" />
                                    PDF format only
                                  </div>

                                  <div className="ml-3">
                                    <i className="clixicon-dontEdit mr-2" />
                                    Don’t edit the PDF
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {bankDetails.perfiosStatus.length > 0 && (
                          <NextAction
                            payload={{ uiStage: 'BANK_STATEMENT_ANALYSIS' }}
                            show
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </Skelton>
  );
}

BankDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appDetails: makeSelectApplicationPage(),
  bankDetails: makeSelectBankDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BankDetails);
