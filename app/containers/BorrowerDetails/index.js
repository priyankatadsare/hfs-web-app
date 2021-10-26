/* eslint-disable indent */
/**
 *
 * BorrowerDetails
 *
 */

import React, { memo, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useForm } from 'react-hook-form';
import { Accordion, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NextAction from 'containers/NextAction/Loadable';
import makeSelectBorrowerDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import InputField from '../../components/InputField';
import CustomToggle from '../../components/CustomToggle';
import PanInput from '../PanInput/Loadable';
import BorrowerType from '../BorrowerType/Loadable';
import makeSelectPanInput from '../PanInput/selectors';
import { EMIAL_PATTERN, MOBILE_PATTERN, DOB_PATTERN } from '../App/constants';
import { createApplication } from './actions';
import CheckConsent from '../CheckConsent';
import SendEmailConsent from '../SendEmailConsent/Loadable';
// import { makeSelectGlobalState } from '../App/selectors';
import BorrowerDetailsPendingSection from '../BorrowerDetailsPendingSection/Loadable';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import Skelton from '../../components/Skelton';
import makeSelectBorrowerType from '../BorrowerType/selectors';
import SendMobileConsent from '../SendMobileConsent/Loadable';

export function BorrowerDetails({
  dispatch,
  panInput,
  globalState,
  borrowerDetails,
  borrowerTypeDropdown,
}) {
  useInjectReducer({ key: 'borrowerDetails', reducer });
  useInjectSaga({ key: 'borrowerDetails', saga });

  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState,
    setValue,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const values = watch();
  const history = useHistory();
  const [addressesFilled, setAddressesFilled] = useState(false);
  const { appId, customerLeadRefId, users = [] } =
    globalState.appResponse || {};
  const currentUser = users[0] || {};
  const extraDataField =
    _.get(globalState.appResponse, 'additionalData.data.extraDataField', {}) ||
    {};
  const isEmailConsentProvided =
    _.get(
      extraDataField,
      `${`${currentUser.preferredEmail}_confirmed_at`}`,
      false,
    ) || false;
  const isMobileConsentProvided =
    _.get(
      extraDataField,
      `${`${currentUser.preferredPhone}_confirmed_at`}`,
      false,
    ) || false;
  const { newAppResponse = false } = borrowerDetails;

  useEffect(() => {
    if (!_.isEmpty(panInput.response)) {
      const { firstName = '', middleName = '', lastName = '' } = _.get(
        panInput,
        `response.${values.pan}`,
        {},
      );
      const fullName = `${firstName} ${middleName} ${lastName}`;
      setValue('fullName', fullName, true);
    }
  }, [panInput]);

  // useEffect(() => {
  //   if (!_.isEmpty(values) && !_.isEmpty(values.dob)) {
  //     const formattedDate = moment(values.dob, ['YYYY-MM-DD']).format(
  //       'DD/MM/YYYY',
  //     );
  //     setValue('dob', formattedDate);
  //   }
  // }, [values.dob]);

  useEffect(() => {
    if (!_.isEmpty(currentUser) && currentUser.type !== 'INDIVIDUAL') {
      const { contactibilities = [] } = currentUser;
      const registeredAddress =
        _.find(contactibilities, {
          contactType: 'REGISTERED',
        }) || false;
      const officeAddress =
        _.find(contactibilities, {
          contactType: 'OFFICE',
        }) || false;
      if (officeAddress && registeredAddress) {
        setAddressesFilled(true);
      } else setAddressesFilled(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (newAppResponse) {
      console.log('---------->>>> History push happended!!! ---------<<<<<<');
      history.push(`/applications/${newAppResponse.appid}`);
    }
  }, [newAppResponse]);

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      const {
        dateOfBirthIncorporation,
        firstName,
        lastName,
        middleName,
        type,
        preferredEmail,
        preferredPhone,
        userIdentities: { pan },
      } = currentUser;
      const fullName = `${firstName} ${middleName} ${lastName}`;
      setValue('fullName', fullName);
      setValue(
        'dob',
        moment(dateOfBirthIncorporation, ['DD-MM-YYYY']).format('YYYY-MM-DD'),
      );
      setValue(
        'borrowerType',
        type === 'INDIVIDUAL' ? 'Individual' : 'Non Individual',
      );
      setValue('pan', pan);
      setValue('mobile', preferredPhone);
      setValue('email', preferredEmail);
    }
  }, [currentUser, globalState.loading, borrowerTypeDropdown.response]);

  console.log('Borrower details form values', values);

  const onSubmit = data => {
    dispatch(createApplication(data));
  };

  return (
    <div>
      <Helmet>
        <title>Borrower Details</title>
        <meta name="description" content="Description of Borrower Details" />
      </Helmet>
      <Skelton loading={globalState.loading}>
        <div className="d-flex justify-content-center">
          <div className="clix-container p-3">
            <Accordion defaultActiveKey="0" className="clix-accordion">
              <Card className="active">
                <Card.Header>
                  <CustomToggle eventKey="0">
                    <span className="icon">
                      <i className="clixicon-personal-info before" />
                    </span>
                    Main Applicant
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="progress-form">
                    <div className="progress-form-inn">
                      {/* ----------New Application form starts below---------- */}
                      <form
                        className="clix-form cutomerVerifyForm"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <VerticalProgressBar values={values} errors={errors} />
                        <div className={`customer-verify-blk ${'active'}`}>
                          <div className="row">
                            <div className="col col-12 col-md-6">
                              <PanInput
                                name="pan"
                                placeholder="Enter PAN"
                                setError={setError}
                                readOnly={!!appId}
                                register={register({
                                  required: true,
                                  message: 'This field is required',
                                  pattern: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                                })}
                                errors={errors}
                                postfix={
                                  <span className="control-note">
                                    Example ABKIH3276F
                                  </span>
                                }
                              />{' '}
                            </div>
                            <div className="col col-12 col-md-6">
                              <BorrowerType
                                name="borrowerType"
                                errors={errors}
                                register={register({ required: true })}
                                disabled={!!appId}
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              <InputField
                                className="form-control"
                                id="fullName"
                                name="fullName"
                                disabled
                                register={register({ required: true })}
                                type="text"
                                errors={errors}
                                placeholder="Full name"
                                labelHtml={
                                  <label htmlFor="fullName">
                                    Full name as per PAN
                                  </label>
                                }
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              <InputField
                                type="date"
                                className="form-control datepicker"
                                errors={errors}
                                readOnly={!!appId}
                                // type="text"
                                id="dob"
                                name="dob"
                                register={register({
                                  required: true,
                                  message: 'This field is required',
                                  // pattern: DOB_PATTERN,
                                })}
                                labelHtml={
                                  <label htmlFor="dob">
                                    Date of{' '}
                                    {values.borrowerType === 'Individual'
                                      ? 'Birth'
                                      : 'Incorporation'}
                                  </label>
                                }
                                // postfix={
                                //   <span className="control-note">
                                //     Date of{' '}
                                //     {values.borrowerType === 'INDIVIDUAL'
                                //       ? 'Birth'
                                //       : 'Incorporation'}
                                //   </span>
                                // }
                                placeholder={` Date of{' '}
                                ${
                                  values.borrowerType === 'Individual'
                                    ? 'Birth'
                                    : 'Incorporation'
                                }`}
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              <InputField
                                className="form-control"
                                id="mobile"
                                readOnly={!!appId}
                                name="mobile"
                                maxLength={10}
                                register={register({
                                  required: true,
                                  maxLength: {
                                    value: 10,
                                    message: 'Max length 10 chracters allowed',
                                  },
                                  pattern: {
                                    value: MOBILE_PATTERN,
                                    message:
                                      'Please enter valid 10 digit Mobile number',
                                  },
                                })}
                                type="text"
                                errors={errors}
                                placeholder="Enter Mobile"
                                labelHtml={
                                  <label htmlFor="mobile">Mobile</label>
                                }
                              />
                            </div>
                            <div className="col col-12 col-md-6">
                              <InputField
                                className="form-control"
                                id="email"
                                name="email"
                                readOnly={!!appId}
                                type="text"
                                maxLength="100"
                                placeholder="Email Address"
                                register={register({
                                  required: true,
                                  maxLength: {
                                    value: 100,
                                    message:
                                      'Maxlength of 100 characters is allowed',
                                  },
                                  pattern: {
                                    value: EMIAL_PATTERN,
                                    message:
                                      'Please enter a valid email ID - example@mail.com',
                                  },
                                  message: 'This field is required',
                                })}
                                errors={errors}
                                labelHtml={
                                  <label htmlFor="email">Email Address</label>
                                }
                              />
                            </div>
                          </div>

                          {appId && !isEmailConsentProvided ? (
                            <div style={{ borderTop: '1px solid #ccc' }}>
                              <SendEmailConsent
                                appid={appId}
                                cuid={currentUser.cuid}
                                emailId={currentUser.preferredEmail || ''}
                              />
                              {/* <SendMobileConsent
                                appid={appId}
                                cuid={currentUser.cuid}
                                mobile={currentUser.preferredPhone || ''}
                              /> */}
                              <CheckConsent leadId={customerLeadRefId} />
                            </div>
                          ) : (
                            appId && (
                              <div
                                style={{
                                  borderTop: '1px solid #ccc',
                                  borderBottom: '1px solid #ccc',
                                }}
                              >
                                <div className="mt-4">
                                  <h5>Consent Status</h5>
                                  {isEmailConsentProvided && (
                                    <div className="row mt-4">
                                      <div className="col col-sm-8 col-md-8">
                                        <p>
                                          Email Consent Provided Successfully
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {isMobileConsentProvided && (
                                    <div className="row">
                                      <div className="col col-sm-8 col-md-8">
                                        <p>
                                          Mobile Consent Provided Successfully
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )}

                          {!appId && (
                            <div className="row phone-hide-blk">
                              <div className="col col-12 col-md-6">
                                <button
                                  className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                                  type="submit"
                                  disabled={!formState.isValid}
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                      {/* ----------New Application form ends ---------- */}
                      {/* ----------Rest of the borrower details form starts here---------- */}
                      {appId && isEmailConsentProvided && (
                        <BorrowerDetailsPendingSection
                          addressesFilled={addressesFilled}
                        />
                      )}
                      {/* ----------Rest of the borrower details form ends---------- */}
                      {appId &&
                        addressesFilled &&
                        !_.isEmpty(
                          currentUser.userDetails ||
                            currentUser.corporateStructure,
                        ) && (
                          <NextAction
                            payload={{ uiStage: 'BORROWER_DETAILS' }}
                            show
                          />
                        )}
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          {/* <ModalOtp /> */}
        </div>
      </Skelton>
    </div>
  );
}

BorrowerDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  panInput: PropTypes.object,
  globalState: PropTypes.object,
  borrowerDetails: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  borrowerDetails: makeSelectBorrowerDetails(),
  panInput: makeSelectPanInput(),
  globalState: makeSelectApplicationPage(),
  borrowerTypeDropdown: makeSelectBorrowerType(),
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

export default compose(
  withConnect,
  memo,
)(BorrowerDetails);
