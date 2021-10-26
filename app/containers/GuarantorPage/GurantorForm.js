import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';

import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import RelationshipDropDown from 'containers/RelationshipDropDown/Loadable';
import InputField from 'components/InputField';
import PanInput from 'containers/PanInput/Loadable';
import Address from 'components/Address';
import {
  EMIAL_PATTERN,
  MOBILE_PATTERN,
  DOB_PATTERN,
  DECIMAL_PATTERN,
  DESIGNATION,
} from 'containers/App/constants';
import GenderDropdown from '../../components/GenderDropdown';
import OptionSelect from '../../components/OptionSelect';

function GuranorForm({
  panInput,
  handleSaveAddress,
  gurantor,
  setValue,
  register,
  values,
  errors,
  triggerValidation,
  formState,
  reset,
  setShowAddressModal,
  setCurentAddress,
  addresses,
  setError,
  appDetails,
  masterQualificationData,
  promoter,
  mainApplicant,
}) {
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
  let allRented = false;
  allRented =
    addresses &&
    addresses.length > 0 &&
    addresses.every(address => address.ownershipType === 'Rented');

  let currentAddress =
    _.find(addresses, {
      contactType: 'CURRENT',
    }) || false;

  let permanentAddress =
    _.find(addresses, {
      contactType: 'PERMANENT',
    }) || false;

  const {
    dateOfBirthIncorporation,
    firstName = '',
    lastName = '',
    middleName = '',
    preferredEmail,
    preferredPhone,
    userIdentities: { pan },
    userDetails: { gender },
    salutation = '',
  } = gurantor || { userIdentities: {}, userDetails: {} };

  const [showQualificationOthers, setshowQualificationOthers] = useState(false);
  const SALUTATION = ['Dr', 'Er', 'MR', 'MRS', 'MS', 'CA'];

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

  let postQualificationExpInMonths = '';
  let qualification = '';
  let profession = '';
  let anyBuildUpProperty = '';
  let qualificationOthers = '';

  if (
    gurantor &&
    gurantor.userDetails &&
    gurantor.userDetails.any_build_up_property
  ) {
    anyBuildUpProperty = gurantor.userDetails.any_build_up_property;
  }

  if (
    gurantor &&
    gurantor.userEmployments &&
    gurantor.userEmployments.length > 0
  ) {
    profession = _.get(
      _.orderBy(_.get(gurantor, 'userEmployments'), 'id', 'desc'),
      '[0].profession',
    );
  }

  if (
    gurantor &&
    gurantor.userEmployments &&
    gurantor.userEmployments.length > 0
  ) {
    postQualificationExpInMonths = _.get(
      _.orderBy(_.get(gurantor, 'userEmployments'), 'id', 'desc'),
      '[0].postQualificationExpInMonths',
    );
  }

  if (
    gurantor &&
    gurantor.userEducations &&
    gurantor.userEducations.length > 0
  ) {
    qualification = _.get(
      _.orderBy(_.get(gurantor, 'userEducations'), 'id', 'desc'),
      '[0].qualification',
    );
    if (
      masterQualificationData &&
      masterQualificationData.length > 0 &&
      masterQualificationData.indexOf(qualification) < 0
    ) {
      qualification = 'Others';
      qualificationOthers = _.get(
        _.orderBy(_.get(gurantor, 'userEducations'), 'id', 'desc'),
        '[0].qualification',
      );
    }
  }

  useEffect(() => {
    const fullName = `${firstName} ${middleName} ${lastName}`;
    if (gurantor) {
      reset({
        fullName,
        preferredEmail,
        preferredPhone,
        dateOfBirthIncorporation: moment(dateOfBirthIncorporation, [
          'DD-MM-YYYY',
          'DD/MM/YYYY',
          'YYYY-MM-DD',
        ]).format('DD/MM/YYYY'),
        pan,
        gender,
        postQualificationExpInMonths,
        qualification,
        qualificationOthers,
        profession,
        salutation,
        rentedRadio: anyBuildUpProperty,
      });
      // triggerValidation();
    } else {
      reset({
        fullName,
        preferredEmail,
        preferredPhone,
        dateOfBirthIncorporation,
        pan,
        gender,
        postQualificationExpInMonths,
        qualification,
        qualificationOthers,
        profession,
        salutation,
        rentedRadio: anyBuildUpProperty,
      });
    }
  }, [gurantor]);

  const saveAddress = address => {
    if (address && address.type === 'CURRENT' && !currentAddress)
      currentAddress = address;

    if (address && address.type === 'PERMANENT' && !permanentAddress)
      permanentAddress = address;

    handleSaveAddress(address);
  };

  const usedPans = _.reject(
    _.map(_.get(appDetails, 'appResponse.users', []), user =>
      _.get(user, 'userIdentities.pan'),
    ),
    upan => upan === pan,
  );
  const usedEmails = _.reject(
    _.map(_.get(appDetails, 'appResponse.users', []), user =>
      _.get(user, 'preferredEmail'),
    ),
    uemail => uemail === preferredEmail,
  );
  const usedPhones = _.reject(
    _.map(_.get(appDetails, 'appResponse.users', []), user =>
      _.get(user, 'preferredPhone'),
    ),
    uphone => uphone === preferredPhone,
  );

  const emailIsUnique = async email => !usedEmails.includes(email);

  const phoneIsUnique = async phone => !usedPhones.includes(phone);

  const panIsUnique = async upan => !usedPans.includes(upan);

  const panIsUniqueExceptCompany = async upan =>
    !_.reject(
      usedPans,
      vpan => vpan === _.get(mainApplicant, 'userIdentities.pan'),
    ).includes(upan);
  return (
    <>
      <div className={`customer-verify-blk ${'active'}`}>
        <div className="row">
          <div className="col col-12 col-md-6">
            <PanInput
              name="pan"
              placeholder="Enter PAN"
              readOnly={!_.isEmpty(gurantor)}
              setError={setError}
              usedPans={usedPans}
              register={register({
                validate:
                  mainApplicant &&
                  mainApplicant.corporateStructure === 'Proprietorship'
                    ? panIsUniqueExceptCompany
                    : panIsUnique,
                required: true,
                message: 'This field is required',
                pattern: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
              })}
              errors={errors}
              postfix={<span className="control-note">Example ABKIH3276F</span>}
            />{' '}
          </div>
          <div className="col col-12 col-md-6">
            <RelationshipDropDown
              name="designation"
              errors={errors}
              register={register({ required: true })}
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
              labelHtml={<label htmlFor="fullName">Full name as per PAN</label>}
            />
          </div>
          <div className="col col-12 col-md-6">
            <InputField
              type="text"
              className="form-control datepicker"
              errors={errors}
              disabled={!_.isEmpty(gurantor)}
              id="dob"
              name="dateOfBirthIncorporation"
              register={register({
                required: true,
                message: 'This field is required',
                pattern: DOB_PATTERN,
              })}
              labelHtml={<label htmlFor="dob">Date of Birth</label>}
              postfix={<span className="control-note">DD/MM/YYYY</span>}
              placeholder="Date of Birth"
            />
          </div>
          <div className="col col-12 col-md-6">
            <InputField
              className="form-control"
              id="mobile"
              name="preferredPhone"
              maxLength={10}
              disabled={!_.isEmpty(gurantor)}
              register={register({
                required: true,
                // validate:
                // mainApplicant &&
                // mainApplicant.corporateStructure == 'Proprietorship'
                //   ? true
                //   : phoneIsUnique,
                maxLength: {
                  value: 10,
                  message: 'Max length 10 characters allowed',
                },
                pattern: {
                  value: MOBILE_PATTERN,
                  message: 'Please enter valid 10 digit Mobile number',
                },
              })}
              type="text"
              errors={errors}
              placeholder="Enter Mobile"
              labelHtml={<label htmlFor="mobile">Mobile</label>}
            />
          </div>
          <div className="col col-12 col-md-6">
            <InputField
              className="form-control"
              id="email"
              name="preferredEmail"
              type="text"
              disabled={!_.isEmpty(gurantor)}
              maxLength="100"
              placeholder="Email Address"
              register={register({
                required: true,
                // validate:
                //   mainApplicant &&
                //   mainApplicant.corporateStructure == 'Proprietorship'
                //     ? true
                //     : emailIsUnique,
                maxLength: {
                  value: 100,
                  message: 'Maxlength of 100 characters is allowed',
                },
                pattern: {
                  value: EMIAL_PATTERN,
                  message: 'Please enter a valid email ID - example@mail.com',
                },
                message: 'This field is required',
              })}
              errors={errors}
              labelHtml={<label htmlFor="email">Email Address</label>}
            />
          </div>
          <div className="col col-12 col-md-6">
            <OptionSelect
              name="qualification"
              errors={errors}
              register={register({ required: true })}
              className="form-control clix-select custom-select"
              initialValue="Select Qualification"
              options={masterQualificationData || []}
              labelHtml={<label htmlFor="qualification">Qualification</label>}
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
                })}
                type="text"
                errors={errors}
                placeholder="Enter Highest Qualification"
                labelHtml={
                  <label htmlFor="qualificationOthers">
                    Highest Qualification
                  </label>
                }
              />
            </div>
          )}
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
          {/* <div className="col col-12 col-md-6">
            <OptionSelect
              name="profession"
              errors={errors}
              register={register({ required: true })}
              className="form-control clix-select custom-select"
              initialValue="Select Profession"
              options={DESIGNATION}
              labelHtml={<label htmlFor="profession">Profession</label>}
            />
          </div> */}
          <div className="col col-12 col-md-6">
            <GenderDropdown
              id="gender"
              name="gender"
              type="select"
              placeholder="Gender"
              register={register({
                required: true,
              })}
              errors={errors}
              labelHtml={<label htmlFor="email">Select Gender</label>}
            />
          </div>
          <div className="col col-12 col-md-6">
            <OptionSelect
              name="salutation"
              errors={errors}
              register={register({ required: true })}
              className="form-control clix-select custom-select"
              initialValue="Salutation"
              options={SALUTATION}
              labelHtml={
                <label htmlFor="qualification">Select Salutation</label>
              }
            />
          </div>
        </div>
        <Address
          handleSaveAddress={saveAddress}
          addresses={addresses}
          setShowAddressModal={setShowAddressModal}
          setCurentAddress={setCurentAddress}
        />
        {addresses.length > 0 &&
          ((!currentAddress && permanentAddress) ||
            (!permanentAddress && currentAddress)) && (
            <div className="row col-12 col-md-12 mt-4">
              <div className="col col-sm-6 col-md-6">
                Are Current residential Address and Permanent Address same?
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
                        // opacity: '0',
                        position: 'absolute',
                      }}
                      errors={errors}
                      type="radio"
                      id="YES_GUR"
                      name="gurantorAddressSameAs"
                      value="YES"
                    />
                    <label htmlFor="YES_GUR" className="yes-ongoingEMI">
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
                        // opacity: '0',
                        position: 'absolute',
                      }}
                      errors={errors}
                      type="radio"
                      id="NO_GUR"
                      name="gurantorAddressSameAs"
                      value="NO"
                    />
                    <label htmlFor="NO_GUR" className="yes-ongoingEMI">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        {allRented && (
          <div className="row col-12 col-md-12 mt-4">
            <div className="col col-12 col-md-6">
              Does Gaurantor or any of the family members own a property in the
              city?
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
                    name="rentedRadio"
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
                    name="rentedRadio"
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
        {!promoter && (
          <div className="row col-12 col-md-12 mt-4">
            <div className="col col-sm-6 col-md-6">
              Is this Guarantor a Promoter?
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
                      // opacity: '0',
                      position: 'absolute',
                    }}
                    errors={errors}
                    type="radio"
                    id="yesGurantorPromoter"
                    name="gurantorPromoter"
                    value="YES"
                  />
                  <label
                    htmlFor="yesGurantorPromoter"
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
                      // opacity: '0',
                      position: 'absolute',
                    }}
                    errors={errors}
                    type="radio"
                    id="noGurantorPromoter"
                    name="gurantorPromoter"
                    value="NO"
                  />
                  <label
                    htmlFor="noGurantorPromoter"
                    className="yes-ongoingEMI"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row phone-hide-blk">
          <div className="col col-12 col-md-6">
            <button
              className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
              type="submit"
              // disabled={!formState.isValid}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(GuranorForm);
