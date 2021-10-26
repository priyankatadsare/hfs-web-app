/**
 *
 * BorrowerDetailsPendingSection
 *
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import _ from 'lodash';
import makeSelectBorrowerDetailsPendingSection from './selectors';
import reducer from './reducer';
import saga from './saga';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import GenderDropdown from '../../components/GenderDropdown';
import QualificationDropDown from '../QualificationDropDown/Loadable';
import BusinessTypeDropdown from '../BusinessTypeDropdown/Loadable';
import ConstitutionDropdown from '../ConstitutionDropdown/Loadable';
import InputField from '../../components/InputField';
import {
  DOB_PATTERN,
  NUMBER_PATTERN,
  STATE_GSTS,
  DECIMAL_PATTERN,
} from '../App/constants';
import { updateAddressList, updateApplication } from './actions';
import AddressInputModal from '../AddressInputModal/Loadable';
import { toggleCommonErrorModal } from '../App/actions';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import BusinessProfileDropdown from '../BusinessProfileDropdown/Loadable';
import SetUpTypeDropdownDropdown from '../SetUpTypeDropdown/Loadable';
import WorkExperienceDropdownDropdown from '../WorkExperienceDropdown/Loadable';
import GstnInput from '../GstnInput';
import OptionSelect from '../../components/OptionSelect';
import makeGstnInput from '../GstnInput/selectors';

export function BorrowerDetailsPendingSection({
  dispatch,
  borrowerDetailsPendingSection,
  globalState,
  addressesFilled,
  gstnInput,
}) {
  useInjectReducer({ key: 'borrowerDetailsPendingSection', reducer });
  useInjectSaga({ key: 'borrowerDetailsPendingSection', saga });

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setError,
    clearError,
    // formState,
    setValue,
  } = useForm({
    mode: 'onChange',
  });
  const values = watch();
  console.log('BorrowerDetailsPendingSection form values', values);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [actionType, setActionType] = useState('Add');
  const [addressToUpdate, setAddressToUpdate] = useState({});
  const [showQualificationOthers, setshowQualificationOthers] = useState(false);
  const [sameAddressAs, setSameAddressAs] = useState('');
  const { appId, users = [], additionalData = {} } =
    globalState.appResponse || {};
  const { response = [] } = gstnInput;
  const msmeValue = _.get(additionalData, 'data.extraDataField.msme');
  const currentUser = users[0] || {};
  const mainApplicant = _.find(_.get(globalState, 'appResponse.users', {}), {
    appLMS: { role: 'Applicant' },
  });
  const additionalVintage = _.get(
    mainApplicant,
    'userDetails.additionalVintage',
  );
  const userEmpId =
    _.get(
      _.filter(
        _.get(mainApplicant, 'userEmployments', []),
        emp => emp.companyName,
      ),
      '[0].id',
    ) || '';
  const latestEmployment = _.orderBy(
    _.filter(mainApplicant.userEmployments, emp => !emp.companyName),
    'id',
    'desc',
  );
  const typeOfBorrower = currentUser.type;
  const SALUTATION = ['Dr', 'Er', 'MR', 'MRS', 'MS', 'CA'];

  let addressListData = [...borrowerDetailsPendingSection.addressList] || [];

  const companyIsunique = async name => {
    const currentName =
      mainApplicant.type == 'COMPANY'
        ? mainApplicant.registeredName.toLowerCase()
        : `${mainApplicant.firstName.toLowerCase()} ${mainApplicant.lastName.toLowerCase()}`;
    return name.toLowerCase() != currentName;
  };

  useEffect(() => {
    if (additionalVintage == 'true') {
      setTimeout(() => {
        setValue([
          {
            businessVintage:
              _.get(
                _.filter(mainApplicant.userEmployments, emp => emp.companyName),
                '[0].businessVintageInMonths',
              ) || '',
          },
          {
            previousEntity:
              _.get(
                _.filter(mainApplicant.userEmployments, emp => emp.companyName),
                '[0].companyName',
              ) || '',
          },
        ]);
      }, 1000);
    }
  }, additionalVintage);

  useEffect(() => {
    // Pre-populate fields logic
    if (!_.isEmpty(currentUser)) {
      if (typeOfBorrower === 'INDIVIDUAL') {
        const {
          userDetails = {},
          userEducations = [],
          contactibilities = [],
          userEmployments = [],
          salutation = '',
        } = currentUser;
        dispatch(updateAddressList(contactibilities));
        const latestEducation = _.orderBy(userEducations, 'id', 'desc');

        const { qualification = '' } = latestEducation[0] || {};
        const {
          companyType = '',
          companyIndutry = '',
          postQualificationExpInMonths = 0,
          businessVintageInMonths = 0,
        } = latestEmployment[0] || {};
        setValue([
          { gender: userDetails.gender || '' },
          { qualification },
          { salutation },
          { businessType: companyType },
          { businessProfile: companyIndutry },
          {
            businessVintageInMonths,
          },
          {
            postQualificationExpInMonths,
          },
          {
            additionalVintageValue: additionalVintage == 'true' ? 'Yes' : 'No',
          },
        ]);
      } else {
        // Pre-populate Entity fields logic
        const {
          corporateStructure,
          contactibilities,
          userEmployments = [],
          appGsts = [],
          registeredName = '',
        } = currentUser;
        const registeredAddress =
          _.find(contactibilities, {
            contactType: 'REGISTERED',
          }) || false;
        const officeAddress =
          _.find(contactibilities, {
            contactType: 'OFFICE',
          }) || false;
        if (!registeredAddress && officeAddress) {
          setSameAddressAs('OFFICE');
        } else if (registeredAddress && !officeAddress) {
          setSameAddressAs('REGISTERED');
        } else setSameAddressAs('');
        // const latestEmployment = _.orderBy(_.filter(mainApplicant.userEmployments, emp => !emp.companyName), 'id', 'desc');
        const {
          companyType = '',
          companyIndutry = '',
          postQualificationExpInMonths = 0,
          businessVintageInMonths = 0,
        } = latestEmployment[0] || {};
        dispatch(updateAddressList(contactibilities));
        setValue([
          { constitution: corporateStructure },
          { registeredName },
          { businessType: companyType },
          { msmeRadioValue: msmeValue ? 'Yes' : 'No' },
          {
            additionalVintageValue: additionalVintage == 'true' ? 'Yes' : 'No',
          },
          { msme: msmeValue },
          { businessProfile: companyIndutry },
          {
            businessVintageInMonths,
          },
          {
            postQualificationExpInMonths,
          },
          {
            gstn: _.get(_.orderBy(appGsts, 'id', 'desc'), '[0].gstn', '') || '',
          },
        ]);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      !_.isEmpty(values) &&
      values.qualification &&
      values.qualification.toLowerCase() === 'others'
    ) {
      setshowQualificationOthers(true);
      return;
    }
    setshowQualificationOthers(false);
  }, [values.qualification]);

  const createAddressList = useCallback(() => {
    // callback to create List of address for UI
    if (
      borrowerDetailsPendingSection.addressList &&
      borrowerDetailsPendingSection.addressList.length > 0
    ) {
      return borrowerDetailsPendingSection.addressList.map((item, index) => (
        <div className="row col-12 mt-3">
          <div className="col col-8 col-sm-8 col-md-8 disbursal-bank-detail">
            <div className="row">
              <h4 style={{ marginRight: '10px' }}>{index + 1}. </h4>
              <h4>
                {item.addressLine1} {item.addressLine2} {item.addressLine3}{' '}
                {item.locality} {item.city} {item.pincode} {item.state}
              </h4>
            </div>
            <div
              className="col col-12 col-sm-12 col-md-12"
              style={{ color: 'rgba(40, 44, 71, 0.7)', fontSize: '12px' }}
            >
              {item.contactType} | {item.ownershipType} |{' '}
              {item.durationOfStayInMonths}
            </div>
          </div>
          <div
            className="col col-4 d-flex col-sm-4 col-md-4"
            style={{ alignItems: 'center' }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={e => {
                e.preventDefault();
                setActionType('Update');
                setAddressToUpdate(item);
                setShowAddressModal(true);
              }}
            >
              <span style={{ margin: '5px', marginLeft: '0' }}>&#9998;</span>
              Edit
            </button>
          </div>
        </div>
      ));
    }
    return <> </>;
  }, [borrowerDetailsPendingSection.addressList]);

  const dispatchAddressListUpdate = (data, action = 'Add') => {
    console.log('data for dispatchAddressListUpdate', data);
    // eslint-disable-next-line no-debugger
    if (action === 'Add') {
      // Add to original list
      addressListData.push(data);
    }
    if (action === 'Update') {
      // Update original list
      const elementsIndex = addressListData.findIndex(
        element => element.id === data.id,
      );
      addressListData[elementsIndex] = data;
    }
    if (action === 'Delete') {
      // Delete item
      addressListData = addressListData.filter(
        item => item.contactType !== data.contactType,
      );
    }
    const registeredAddress =
      _.find(addressListData, {
        contactType: 'REGISTERED',
      }) || false;
    const officeAddress =
      _.find(addressListData, {
        contactType: 'OFFICE',
      }) || false;
    if (!registeredAddress && officeAddress) {
      setSameAddressAs('OFFICE');
    } else if (registeredAddress && !officeAddress) {
      setSameAddressAs('REGISTERED');
    } else setSameAddressAs('');
    dispatch(updateAddressList(addressListData));
  };

  const onSubmit = data => {
    console.log('data', data);
    // Check if addressList exists
    if (addressListData.length === 0) {
      // Show error for address
      dispatch(
        toggleCommonErrorModal({
          show: true,
          message: 'Please add Addresses to proceed.',
        }),
      );
      return;
    }

    // Check for Indivdual type addressList
    if (typeOfBorrower === 'INDIVIDUAL') {
      const officeAddressSameAsCurrent = data.addressSameAsCurrent || 'NO';
      if (officeAddressSameAsCurrent === 'YES') {
        // Copy current address as office address...
        const currentAddress =
          _.find(addressListData, {
            contactType: 'CURRENT',
          }) || false;
        if (!currentAddress) {
          dispatch(
            toggleCommonErrorModal({
              show: true,
              message:
                'Please add Current residential address or uncheck Office address same as Current to proceed',
            }),
          );
          return;
        }
        const officeAddress = {
          ...currentAddress,
          contactType: 'OFFICE',
        };
        addressListData.push(officeAddress);
        dispatch(updateAddressList(addressListData));
      } else {
        // officeAddress is not Same As Current, so check that both addresses should be present
        const currentAddress =
          _.find(addressListData, {
            contactType: 'CURRENT',
          }) || false;
        const officeAddress =
          _.find(addressListData, {
            contactType: 'OFFICE',
          }) || false;
        if (!currentAddress || !officeAddress) {
          dispatch(
            toggleCommonErrorModal({
              show: true,
              message:
                'Please add Current residential address and Office address to proceed',
            }),
          );
          return;
        }
      }
    } else {
      const sameAddressNonIndividual = data.sameAddressNonIndividual || 'NO';
      const registeredAddress =
        _.find(addressListData, {
          contactType: 'REGISTERED',
        }) || false;
      const officeAddress =
        _.find(addressListData, {
          contactType: 'OFFICE',
        }) || false;
      // officeAddress State ic checked with gstn
      let officeAddressState = _.get(
        _.find(addressListData, {
          contactType: 'OFFICE',
        }),
        'state',
        '',
      );
      if (
        !officeAddressState &&
        sameAddressNonIndividual === 'Yes' &&
        sameAddressAs === 'REGISTERED'
      ) {
        officeAddressState = _.get(registeredAddress, 'state');
      }
      if (officeAddressState && data.gstn) {
        if (
          STATE_GSTS[data.gstn.substring(0, 2)] !==
          _.upperCase(officeAddressState)
        ) {
          dispatch(
            toggleCommonErrorModal({
              show: true,
              message:
                'GSTN Number is not of the State where the Office Address, please change either of two!',
            }),
          );
          return;
        }
      }

      if (sameAddressNonIndividual === 'YES') {
        if (sameAddressAs === 'OFFICE') {
          addressListData.push({
            ...officeAddress,
            contactType: 'REGISTERED',
            id: '',
          });
          dispatch(updateAddressList(addressListData));
        } else if (sameAddressAs === 'REGISTERED') {
          addressListData.push({
            ...registeredAddress,
            contactType: 'OFFICE',
            id: '',
          });
          dispatch(updateAddressList(addressListData));
        }
      } else if (
        !_.find(addressListData, {
          contactType: 'REGISTERED',
        }) ||
        !_.find(addressListData, {
          contactType: 'OFFICE',
        })
      ) {
        dispatch(
          toggleCommonErrorModal({
            show: true,
            message:
              'One Registered and One Office Address is mandatory for Non-Individual for moving ahead!',
          }),
        );
        return;
      }
    }

    let appPayload = {};
    if (typeOfBorrower === 'INDIVIDUAL') {
      appPayload = {
        users: [
          {
            id: currentUser.id,
            cuid: currentUser.cuid,
            userDetails: {
              gender: data.gender,
              additionalVintage: data.additionalVintageValue === 'Yes',
            },
            contactibilities: addressListData.map(addrress => ({
              ...addrress,
              phoneNumber: currentUser.preferredPhone,
              email: currentUser.preferredEmail,
              id: addrress.id.toString().includes('new') ? '' : addrress.id,
            })),
            salutation: data.salutation,
            userEducations: [
              {
                qualification:
                  data.qualification.toLowerCase() === 'others'
                    ? data.qualificationOthers
                    : data.qualification,
              },
            ],
            userEmployments: [
              {
                id:
                  latestEmployment &&
                  latestEmployment[0] &&
                  latestEmployment[0].id,
                companyType: data.businessType,
                companyIndutry: data.businessProfile,
                businessVintageInMonths: data.businessVintageInMonths,
                postQualificationExpInMonths: data.postQualificationExpInMonths,
              },
            ],
          },
        ],
        additionalData: {
          data: {
            extraDataField: {
              experienceOfDiagnosticCentre:
                data.experienceOfDiagnostic === 'YES',
            },
          },
        },
        appId,
      };
    } else {
      appPayload = {
        users: [
          {
            id: currentUser.id,
            cuid: currentUser.cuid,
            registeredName: values.registeredName,
            // userDetails: {
            //   yearsInSameIndustry: data.workExperience,
            // },
            appGsts:
              response && response.length > 0 && data.gstn
                ? [
                    {
                      id:
                        _.get(
                          _.orderBy(currentUser.appGsts || [], 'id', 'desc'),
                          '[0].id',
                          '',
                        ) || '',
                      gstn: data.gstn,
                    },
                  ]
                : [],
            userEmployments: [
              {
                id:
                  latestEmployment &&
                  latestEmployment[0] &&
                  latestEmployment[0].id,
                companyType: data.businessType,
                companyIndutry: data.businessProfile,
                businessVintageInMonths: data.businessVintageInMonths,
                postQualificationExpInMonths: data.postQualificationExpInMonths,
              },
            ],
            userDetails: {
              industry: 'Hospitals and Clinics',
              natureOfBusiness: 'Service',
              product:
                'Activities of independent diagnostic/pathological laboratories',
              segment: 'Diagnostic Centre  Hospitals or Gyms or health Centre',
              additionalVintage: data.additionalVintageValue === 'Yes',
            },
            corporateStructure: data.constitution,
            dateOfBirthIncorporation: data.doc,
            contactibilities: addressListData.map(addrress => ({
              ...addrress,
              phoneNumber: currentUser.preferredPhone,
              email: currentUser.preferredEmail,
              id: addrress.id.toString().includes('new') ? '' : addrress.id,
            })),
          },
        ],
        additionalData: {
          data: {
            extraDataField: {
              experienceOfDiagnosticCentre:
                data.experienceOfDiagnostic === 'YES',
              msme: data.msme,
            },
          },
        },
        appId,
      };
    }
    if (data.additionalVintageValue == 'Yes') {
      appPayload.users[0].userEmployments.push({
        id: userEmpId,
        companyName: data.previousEntity,
        businessVintageInMonths: data.businessVintage,
      });
    }
    dispatch(updateApplication(appPayload));
  };

  const checkTenureMnoths = async tenure =>
    parseInt(tenure, 10) > 60 || parseInt(tenure, 10) <= 0
      ? 'Max tenure of 60 months is allowed'
      : true;

  return (
    <>
      <form
        className="clix-form cutomerVerifyForm mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <VerticalProgressBar values={values} errors={errors} />
        <div className={`customer-verify-blk ${'active'}`}>
          <div className="row">
            {typeOfBorrower === 'INDIVIDUAL' ? (
              // Individual input fields below
              <>
                <div className="col col-12 col-md-6">
                  <OptionSelect
                    name="salutation"
                    errors={errors}
                    register={register({ required: true })}
                    className="form-control clix-select custom-select"
                    initialValue="Salutation"
                    options={SALUTATION}
                    labelHtml={
                      <label htmlFor="workex">Select Salutation</label>
                    }
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <GenderDropdown
                    name="gender"
                    errors={errors}
                    register={register({ required: true })}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <QualificationDropDown
                    name="qualification"
                    errors={errors}
                    register={register({ required: true })}
                  />
                </div>
                {showQualificationOthers && (
                  <div className="col col-12 col-md-6">
                    <InputField
                      className="form-control"
                      id="qualificationOthers"
                      name="qualificationOthers"
                      register={register({
                        required: true,
                        // pattern: {
                        //   value: NUMBER_PATTERN,
                        //   message: 'Please enter numbers only',
                        // },
                      })}
                      type="text"
                      errors={errors}
                      placeholder="Enter Qualification"
                      labelHtml={
                        <label htmlFor="qualificationOthers">
                          Highest Qualification
                        </label>
                      }
                    />
                  </div>
                )}
              </>
            ) : (
              // Entity input fields below--------
              <>
                <div className="col col-12 col-md-6">
                  <ConstitutionDropdown
                    name="constitution"
                    errors={errors}
                    register={register({ required: true })}
                  />
                </div>
                {values.constitution === 'Proprietorship' && (
                  <div className="col col-12 col-md-6">
                    <InputField
                      className="form-control"
                      id="registeredName"
                      name="registeredName"
                      register={register({
                        required: true,
                      })}
                      defaultValue={_.get(currentUser, 'registeredName')}
                      type="text"
                      errors={errors}
                      placeholder="Enter Registered Name"
                      labelHtml={
                        <label htmlFor="registeredName">Registered Name</label>
                      }
                    />
                  </div>
                )}
              </>
            )}
            {/* D2CP2-1329: removed business type as discussed on 18th MAy  */}
            {/* <div className="col col-12 col-md-6">
              <BusinessTypeDropdown
                name="businessType"
                errors={errors}
                register={register({ required: true })}
              />
            </div> */}
            <div className="col col-12 col-md-6">
              <BusinessProfileDropdown
                name="businessProfile"
                errors={errors}
                register={register({ required: true })}
              />
            </div>
            {/* <div className="col col-12 col-md-6">
              <SetUpTypeDropdownDropdown
                name="setupType"
                errors={errors}
                register={register({ required: true })}
              />
            </div> */}
            <div className="col col-12 col-md-6">
              <InputField
                className="form-control"
                id="businessVintageInMonths"
                name="businessVintageInMonths"
                register={register({
                  required: true,
                  maxLength: {
                    value: 3,
                    message: 'Max length 3 allowed',
                  },
                  pattern: {
                    value: NUMBER_PATTERN,
                    message: 'Please enter numbers only',
                  },
                  // validate: checkTenureMnoths,
                })}
                type="text"
                errors={errors}
                placeholder="Enter Business Vintage of Current Entity(in months)"
                labelHtml={
                  <label htmlFor="businessVintageInMonths">
                    Business Vintage of Current Entity(in months)
                  </label>
                }
              />
            </div>
            {typeOfBorrower === 'INDIVIDUAL' && (
              <div className="col col-12 col-md-6">
                <InputField
                  className="form-control"
                  id="postQualificationExpInMonths"
                  name="postQualificationExpInMonths"
                  type="text"
                  placeholder="Post Qualification Experience (in months)"
                  register={register({
                    required: true,
                    maxLength: {
                      value: 100,
                      message: 'Maxlength of 100 characters is allowed',
                    },
                    pattern: {
                      value: DECIMAL_PATTERN,
                      message: 'Please enter valid number',
                    },
                    message: 'This field is required',
                  })}
                  errors={errors}
                  labelHtml={
                    <label htmlFor="postQualificationExpInMonths">
                      Post Qualification Experience (in months)
                    </label>
                  }
                />
              </div>
            )}
            {/* <WorkExperienceDropdownDropdown
                name="workExperience"
                errors={errors}
                register={register({ required: true })}
              /> */}
            {typeOfBorrower !== 'INDIVIDUAL' && (
              <div className="col col-12 col-md-6">
                <GstnInput
                  name="gstn"
                  errors={errors}
                  setError={setError}
                  clearError={clearError}
                  register={register({ required: false })}
                />
              </div>
            )}
            {typeOfBorrower !== 'INDIVIDUAL' && (
              <div className="row col-12 col-md-12 mt-4">
                <div className="col col-12 col-md-6">
                  Does Entity fall under MSME Categorization?
                </div>
                <div className="row col-sm-6 col-md-6">
                  <div className="col col-sm-6 col-md-3">
                    <div className="radio_button">
                      <InputField
                        // defaultChecked={defaultChecked === true ? true : false}
                        register={register({
                          required: true,
                          message: 'This field is required',
                        })}
                        style={{
                          opacity: '0',
                          position: 'absolute',
                        }}
                        errors={errors}
                        type="radio"
                        id="Yes"
                        name="msmeRadioValue"
                        value="Yes"
                      />
                      <label htmlFor="Yes" className="yes-ongoingEMI">
                        Yes
                      </label>
                    </div>
                  </div>
                  <div className="col col-sm-6 col-md-3">
                    <div className="radio_button">
                      <InputField
                        // defaultChecked={defaultChecked === true ? true : false}
                        register={register({
                          required: true,
                          message: 'This field is required',
                        })}
                        style={{
                          opacity: '0',
                          position: 'absolute',
                        }}
                        errors={errors}
                        type="radio"
                        id="No"
                        name="msmeRadioValue"
                        value="No"
                      />
                      <label htmlFor="No" className="yes-ongoingEMI">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {values.msmeRadioValue == 'Yes' && (
              <div className="col col-12 col-md-6">
                <OptionSelect
                  name="msme"
                  errors={errors}
                  register={register({ required: true })}
                  className="form-control clix-select custom-select"
                  initialValue="Select"
                  options={['Small', 'Micro', 'Medium', 'Others']}
                  labelHtml={<label htmlFor="msme">MSME</label>}
                />
              </div>
            )}

            <div className="row col-12 col-md-12 mt-4">
              <div className="col col-12 col-md-6">
              Do you have any other entity also in health Care business?
              </div>
              <div className="row col-sm-6 col-md-6">
                <div className="col col-sm-6 col-md-3">
                  <div className="radio_button">
                    <InputField
                      // defaultChecked={defaultChecked === true ? true : false}
                      register={register({
                        required: true,
                        message: 'This field is required',
                      })}
                      style={{
                        opacity: '0',
                        position: 'absolute',
                      }}
                      errors={errors}
                      type="radio"
                      id="additionalVintageYes"
                      name="additionalVintageValue"
                      value="Yes"
                    />
                    <label
                      htmlFor="additionalVintageYes"
                      className="yes-ongoingEMI"
                    >
                      Yes
                    </label>
                  </div>
                </div>
                <div className="col col-sm-6 col-md-3">
                  <div className="radio_button">
                    <InputField
                      // defaultChecked={defaultChecked === true ? true : false}
                      register={register({
                        required: true,
                        message: 'This field is required',
                      })}
                      style={{
                        opacity: '0',
                        position: 'absolute',
                      }}
                      errors={errors}
                      type="radio"
                      id="additionalVintageNo"
                      name="additionalVintageValue"
                      value="No"
                    />
                    <label
                      htmlFor="additionalVintageNo"
                      className="yes-ongoingEMI"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {values.additionalVintageValue == 'Yes' && (
              <>
                <div className="row col-12 col-md-12 mt-4">
                  <div className="col col-12 col-md-6">
                    A.  Overall/Total Business Vintage in Healthcare Business :
                  </div>
                  <div className="col col-12 col-md-4">
                    <InputField
                      className="form-control"
                      id="businessVintage"
                      name="businessVintage"
                      register={register({
                        required: true,
                        maxLength: {
                          value: 3,
                          message: 'Max length 3 allowed',
                        },
                        pattern: {
                          value: NUMBER_PATTERN,
                          message: 'Please enter numbers only',
                        },
                        // validate: checkTenureMnoths,
                      })}
                      type="text"
                      errors={errors}
                      placeholder="Enter Business Vintage(in months)"
                      labelHtml={
                        <label htmlFor="businessVintage">
                          Business Vintage(in months)
                        </label>
                      }
                    />
                  </div>
                </div>
                <div className="row col-12 col-md-12 mt-4">
                  <div className="col col-12 col-md-6">
                    B. Name of other business entity / entities in same line of
                    business:
                  </div>
                  <div className="col col-12 col-md-4">
                    <InputField
                      className="form-control"
                      id="previousEntity"
                      name="previousEntity"
                      register={register({
                        validate: companyIsunique,
                        required: true,
                      })}
                      type="text"
                      errors={errors}
                      placeholder="Previous Entity"
                      labelHtml={
                        <label htmlFor="previousEntity">Previous Entity</label>
                      }
                    />
                  </div>
                </div>
              </>
            )}
            <div className="col col-12 col-md-12">
              <div
                className="row justify-content-between"
                style={{ padding: '1rem' }}
              >
                <div>
                  <h5>Addresses</h5>
                  {!addressesFilled && (
                    <div style={{ color: '#dc3545', fontSize: '12px' }}>
                      {typeOfBorrower !== 'INDIVIDUAL' &&
                        'One Registered and One Office Address is mandatory for Non-Individual'}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn button btn-lg button-primary"
                  onClick={e => {
                    e.preventDefault();
                    setActionType('Add');
                    setAddressToUpdate({});
                    setShowAddressModal(true);
                  }}
                >
                  Add Address +
                </button>
              </div>
              <div className="row">{createAddressList()}</div>
            </div>
            {typeOfBorrower === 'INDIVIDUAL' && addressListData.length > 0 && (
              <div className="row col-12 col-md-12 mt-4">
                <div className="col col-sm-6 col-md-6">
                  Is Office Address Same as Current residential Address ?
                </div>
                <div className="row col-sm-6 col-md-6">
                  <div className="col col-sm-6 col-md-3">
                    <div className="radio_button">
                      <InputField
                        // defaultChecked={defaultChecked === true ? true : false}
                        register={register({
                          required: true,
                          message: 'This field is required',
                        })}
                        style={{
                          opacity: '0',
                          position: 'absolute',
                        }}
                        errors={errors}
                        type="radio"
                        id="YES"
                        name="addressSameAsCurrent"
                        value="YES"
                      />
                      <label htmlFor="YES" className="yes-ongoingEMI">
                        Yes
                      </label>
                    </div>
                  </div>
                  <div className="col col-sm-6 col-md-3">
                    <div className="radio_button">
                      <InputField
                        // defaultChecked={defaultChecked === true ? true : false}
                        register={register({
                          required: true,
                          message: 'This field is required',
                        })}
                        style={{
                          opacity: '0',
                          position: 'absolute',
                        }}
                        errors={errors}
                        type="radio"
                        id="NO"
                        name="addressSameAsCurrent"
                        value="NO"
                      />
                      <label htmlFor="NO" className="yes-ongoingEMI">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {typeOfBorrower !== 'INDIVIDUAL' &&
              // !addressesFilled &&
              sameAddressAs && (
                <div className="row col-12 col-md-12 mt-4">
                  <div className="col col-sm-6 col-md-6">
                    Are Office Address and Registered Address same?
                  </div>
                  <div className="row col-sm-6 col-md-6">
                    <div className="col col-sm-6 col-md-3">
                      <div
                        className="radio_button"
                        style={{ width: 'max-content' }}
                      >
                        <InputField
                          // defaultChecked={defaultChecked === true ? true : false}
                          register={register({
                            required: true,
                            message: 'This field is required',
                          })}
                          style={{
                            // opacity: '0',
                            position: 'absolute',
                          }}
                          errors={errors}
                          type="radio"
                          id="YES"
                          name="sameAddressNonIndividual"
                          value="YES"
                        />
                        <label htmlFor="YES" className="yes-ongoingEMI">
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col col-sm-6 col-md-3">
                      <div
                        className="radio_button"
                        style={{ width: 'max-content' }}
                      >
                        <InputField
                          // defaultChecked={defaultChecked === true ? true : false}
                          register={register({
                            required: true,
                            message: 'This field is required',
                          })}
                          style={{
                            // opacity: '0',
                            position: 'absolute',
                          }}
                          errors={errors}
                          type="radio"
                          id="NO"
                          name="sameAddressNonIndividual"
                          value="NO"
                        />
                        <label htmlFor="NO" className="yes-ongoingEMI">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className="row phone-hide-blk">
            <div className="col col-12 col-md-6">
              <button
                className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                type="submit"
                // disabled={!formState.isValid}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <AddressInputModal
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
        callBack={dispatchAddressListUpdate}
        actionType={actionType}
        address={addressToUpdate}
        heading="Business Address Form"
      />
    </>
  );
}

BorrowerDetailsPendingSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  globalState: PropTypes.object,
  borrowerDetailsPendingSection: PropTypes.object,
  addressesFilled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  borrowerDetailsPendingSection: makeSelectBorrowerDetailsPendingSection(),
  globalState: makeSelectApplicationPage(),
  gstnInput: makeGstnInput(),
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
)(BorrowerDetailsPendingSection);
