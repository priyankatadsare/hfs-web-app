/* eslint-disable no-restricted-syntax */
/**
 *
 * GuarantorPage
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';

import VerticalProgressBar from 'components/VerticalProgressBar';
import AddressInputModal from 'containers/AddressInputModal/Loadable';
import NextAction from 'containers/NextAction/Loadable';
import Skelton from 'components/Skelton';
import CustomToggle from 'components/CustomToggle';
import { Accordion, Card } from 'react-bootstrap';
import makeSelectPanInput from 'containers/PanInput/selectors';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import {
  setAddresses,
  setCurentAddress,
  callBureau,
  callConsumerHunter,
} from 'containers/ApplicationPage/actions';

import { toggleCommonErrorModal } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGuarantorPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import GurantorDetail from './GurantorDetail';
import GurantorForm from './GurantorForm';
import { fetchUser, fetchQualification, updateProfileForBoth } from './actions';

export function GuarantorPage({
  guarantorPage,
  panInput,
  appDetails,
  dispatch,
}) {
  useInjectReducer({ key: 'guarantorPage', reducer });
  useInjectSaga({ key: 'guarantorPage', saga });
  const [addgurantor, setaddgurantor] = useState(true);
  const [curentGurantor, setcurentGurantor] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addMore, setAddMore] = useState(true);
  const formRef = useRef(null);

  const match = useRouteMatch('/applications/:appid');

  const handleSetCurrentAddress = item => {
    dispatch(setCurentAddress(item));
    setShowAddressModal(true);
  };
  const {
    params: { appid },
  } = match;

  const {
    register,
    watch,
    errors,
    handleSubmit,
    formState,
    setValue,
    triggerValidation,
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const values = watch();
  const [addressesFilled, setAddressesFilled] = useState(true);
  const { masterQualificationData = [] } = guarantorPage;

  const { addresses = [], loading, error, currentAddress } = appDetails;

  // const { leadId } = _.get(appDetails, 'leadResponse', {});

  // D2CP2-1123: Earlier the GUARANTOR had type = 'GUARANTOR' but now on type == 'INDIVIDUAL' and  appLMS: { role: 'GUARANTOR' }
  const gurantors = _.filter(
    _.get(appDetails, 'appResponse.users', {}),
    user => _.get(user, 'appLMS.role') !== 'Applicant',
  );

  const mainApplicant = _.find(_.get(appDetails, 'appResponse.users', {}), {
    appLMS: { role: 'Applicant' },
  });
  const promoter = _.find(_.get(appDetails, 'appResponse.users', {}), {
    appLMS: { role: 'PROMOTER' },
  });

  const relationShip = _.find(
    _.get(guarantorPage, `response.${guarantorPage.cuid}.entityOfficers`),
    {
      belongsTo: (mainApplicant || {}).cuid,
    },
  );

  const typeOfBorrower = _.get(mainApplicant, 'type', false);

  useEffect(() => {
    if (relationShip) {
      setValue('designation', relationShip.designation);
    }
  }, [guarantorPage]);

  useEffect(() => {
    dispatch(fetchQualification());
  }, []);

  useEffect(() => {
    setcurentGurantor(false);
    setaddgurantor(true);
  }, [loading]);

  useEffect(() => {
    if (curentGurantor.cuid) {
      dispatch(fetchUser(curentGurantor.cuid));
    }
  }, [curentGurantor]);

  useEffect(() => {
    if (gurantors.length <= 0) {
      setaddgurantor(false);
    }
    if (gurantors.length <= 5) {
      setAddMore(true);
    } else {
      setAddMore(false);
      setaddgurantor(true);
      setcurentGurantor(false);
    }
  }, [gurantors]);

  useEffect(() => {
    let allAddressesFilled = true;
    gurantors.forEach(gurantor => {
      if (!_.isEmpty(gurantor)) {
        const { contactibilities = [] } = gurantor;
        const existingCurrentAddress =
          _.find(contactibilities, {
            contactType: 'CURRENT',
          }) || false;

        const existingPermanentAddress =
          _.find(contactibilities, {
            contactType: 'PERMANENT',
          }) || false;

        if (!existingCurrentAddress || !existingPermanentAddress)
          allAddressesFilled = false;
      }
    });
    setAddressesFilled(allAddressesFilled);
  }, [appDetails]);

  const { uiStage } = _.get(appDetails, 'leadResponse.details', {});
  console.log('gurantors', gurantors);

  // const handleSkip = e => {
  //   dispatch(updateLead({ uiStage: 'LOAN_DETAILS' }));
  // };

  // const handleContinue = e => {
  //   dispatch(updateLead({ uiStage: 'LOAN_DETAILS' }));
  // };

  const handleNextClick = () => {
    // eslint-disable-next-line array-callback-return
    gurantors.map(applicant => {
      dispatch(callBureau(applicant));
      dispatch(callConsumerHunter({ ...applicant, appid }));
    });
  };
  const handleSaveAddress = address => {
    const addreses = addresses || [];
    const addressIndex = _.findIndex(addreses, { id: address.id });
    if (addressIndex >= 0) {
      addreses[addressIndex] = address;
    } else {
      addreses.push(address);
    }
    dispatch(setAddresses([...addreses]));
  };

  const handleSetGurantor = gurantor => {
    setcurentGurantor(gurantor);
    dispatch(setAddresses(gurantor.contactibilities));
  };
  const onSubmit = data => {
    const gurantorAddressSameAs = data.gurantorAddressSameAs || 'NO';
    if ((addresses || []).length === 0) {
      // Show error for address
      dispatch(
        toggleCommonErrorModal({
          show: true,
          message: 'Please add Addresses to proceed.',
        }),
      );
      return;
    }

    if (gurantorAddressSameAs === 'YES') {
      const currentAddressGurantor =
        _.find(addresses, {
          contactType: 'CURRENT',
        }) || false;

      const permanentAddressGurantor =
        _.find(addresses, {
          contactType: 'PERMANENT',
        }) || false;

      if (currentAddressGurantor && !permanentAddressGurantor) {
        addresses.push({
          ...currentAddressGurantor,
          contactType: 'PERMANENT',
          id: '',
        });
      } else if (!currentAddressGurantor && permanentAddressGurantor) {
        addresses.push({
          ...permanentAddressGurantor,
          contactType: 'CURRENT',
          id: '',
        });
      }
    } else if (
      !_.find(addresses, {
        contactType: 'CURRENT',
      }) ||
      !_.find(addresses, {
        contactType: 'PERMANENT',
      })
    ) {
      dispatch(
        toggleCommonErrorModal({
          show: true,
          message:
            'One Current and One Permanent Address is mandatory for a Gurantor for moving ahead!',
        }),
      );
      return;
    }
    const curentG = curentGurantor || {};

    let { firstName, middleName, lastName } = _.get(
      panInput,
      `response.${data.pan}`,
      {},
    );
    firstName = firstName || curentG.firstName;
    middleName = middleName || curentG.middleName;
    lastName = lastName || curentG.lastName;
    const payload = {
      users: [
        {
          cuid: curentG.cuid || '',
          id: curentG.id,
          userIdentities: {
            pan: data.pan,
          },
          userDetails: {
            gender: data.gender,
          },
          firstName,
          middleName,
          lastName,
          salutation: data.salutation,
          preferredEmail: data.preferredEmail,
          preferredPhone: data.preferredPhone,
          dateOfBirthIncorporation: moment(data.dateOfBirthIncorporation, [
            'DD/MM/YYYY',
            'DD-MM-YYYY',
            'YYYY-MM-DD',
          ]).format('YYYY-MM-DD'),
          type: 'INDIVIDUAL', // changed from GUARANTOR to APPLICANT and put appLMS: { role: 'GUARANTOR' } as per D2CP2-1123
          appLMS: { role: 'GUARANTOR' },
          entityOfficers: [
            {
              designation: data.designation,
              belongsTo: mainApplicant.cuid,
            },
          ],
          contactibilities: addresses.map(addrress => ({
            ...addrress,
            id: addrress.id.toString().includes('new') ? '' : addrress.id,
          })),
          userEmployments: [
            {
              postQualificationExpInMonths: data.postQualificationExpInMonths,
              businessVintageInMonths: data.businessVintageInMonths,
              profession: data.profession,
              id: _.get(
                _.orderBy(_.get(curentG, 'userEmployments'), 'id', 'desc'),
                '[0].id',
                '',
              ),
            },
          ],
          userEducations: [
            {
              qualification:
                data.qualification.toLowerCase() === 'others'
                  ? data.qualificationOthers
                  : data.qualification,
              id: _.get(
                _.orderBy(_.get(curentG, 'userEducations'), 'id', 'desc'),
                '[0].id',
                '',
              ),
            },
          ],
        },
      ],
      appId: appid,
    };
    if (data.rentedRadio) {
      payload.users[0].userDetails = {
        gender: data.gender,
        any_build_up_property: data.rentedRadio,
      };
    }
    if (data.gurantorPromoter === 'YES') {
      payload.users[0].appLMS = {
        role: 'PROMOTER',
      };
    }
    dispatch(updateProfileForBoth(payload));
    setcurentGurantor(false);
    setaddgurantor(true);
  };

  return (
    <Skelton loading={loading} error={error}>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion
            defaultActiveKey="GUARANTOR_DETAILS"
            className="clix-accordion"
          >
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="GUARANTOR_DETAILS">
                  <span className="icon">
                    <i className="clixicon-personal-info before" />
                  </span>
                  {uiStage === 'ASK_GUARANTOR'
                    ? 'Add GUARANTOR'
                    : 'Guarantor Details'}
                  {/* <button
                    style={{
                      float: 'right',
                      height: 'auto',
                      lineHeight: 'normal',
                      color: '#d5d5d5',
                    }}
                    type="button"
                    className="btn button"
                    onClick={e => handleSkip(e)}
                  >
                    Skip
                  </button> */}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="GUARANTOR_DETAILS">
                <Card.Body className="progress-form clix-form disbursal-bank-detail">
                  <div className="progress-form-inn">
                    {/* <div className="warning mt-4 mb-4">
                      {gurantors.length > 0 &&
                        !promoter &&
                        'Please set one Gurantor as Promoter!'}
                    </div> */}
                    {/* <div className="row">{createAddressList()}</div> */}
                    {/* ----------New Application form starts below---------- */}
                    {gurantors.map((gurantor, index) => (
                      <>
                        <GurantorDetail
                          formRef={formRef}
                          index={index + 1}
                          gurantor={gurantor}
                          setcurentGurantor={handleSetGurantor}
                          appDetails={appDetails}
                        />
                        <hr className="mt-4 mb-4" />
                      </>
                    ))}
                    {/* <hr className="mt-4 mb-4" /> */}
                    {addMore && addgurantor ? (
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
                            setaddgurantor(false);
                            setcurentGurantor(false);
                            dispatch(setAddresses(false));
                          }}
                        >
                          Add Guarantor
                        </button>
                      </div>
                    ) : null}
                    {curentGurantor || (!addgurantor && addMore) ? (
                      <>
                        <div
                          className="row justify-content-between"
                          style={{ padding: '1rem' }}
                          ref={formRef}
                        >
                          <h5>{`${
                            curentGurantor ? 'Edit' : 'New'
                          } Guarantor`}</h5>
                          {gurantors.length ? (
                            <button
                              type="button"
                              style={{ float: 'left' }}
                              className="btn button  button-secondary"
                              onClick={e => {
                                e.preventDefault();
                                setaddgurantor(true);
                                setcurentGurantor(false);
                              }}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                        <form
                          className="clix-form disbursal-bank-detail"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <VerticalProgressBar
                            values={values}
                            errors={errors}
                          />
                          <GurantorForm
                            register={register}
                            triggerValidation={triggerValidation}
                            formState={formState}
                            errors={errors}
                            setError={setError}
                            values={values}
                            setValue={setValue}
                            panInput={panInput}
                            gurantor={curentGurantor}
                            handleSaveAddress={handleSaveAddress}
                            setShowAddressModal={setShowAddressModal}
                            setCurentAddress={handleSetCurrentAddress}
                            reset={reset}
                            addresses={addresses}
                            masterQualificationData={masterQualificationData}
                            promoter={promoter}
                            mainApplicant={mainApplicant}
                          />
                        </form>
                      </>
                    ) : null}
                  </div>
                  {/* <CustomToggle eventKey={uiStage}> */}
                  <NextAction
                    onClick={handleNextClick}
                    payload={{ uiStage: 'GUARANTOR_DETAILS' }}
                    buttonText={gurantors.length <= 0 ? 'Skip' : 'Next'}
                    show={
                      ((typeOfBorrower === 'INDIVIDUAL' &&
                        gurantors.length <= 0) ||
                        (addgurantor && !curentGurantor)) &&
                      addressesFilled
                    }
                  />
                  {/* </CustomToggle> */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <AddressInputModal
          showAddressModal={showAddressModal}
          setShowAddressModal={setShowAddressModal}
          callBack={handleSaveAddress}
          address={currentAddress}
          heading="Residential Address Form"
        />
        {/* <ModalOtp /> */}
      </div>
    </Skelton>
  );
}

GuarantorPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  panInput: makeSelectPanInput(),
  guarantorPage: makeSelectGuarantorPage(),
  appDetails: makeSelectApplicationPage(),
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

export default compose(withConnect)(GuarantorPage);
