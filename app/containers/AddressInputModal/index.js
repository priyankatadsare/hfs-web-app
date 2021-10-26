/**
 *
 * AddressInputModal
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import makeSelectAddressInputModal from './selectors';
import reducer from './reducer';
import saga from './saga';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import AddressTypeDropdown from '../AddressTypeDropdown/Loadable';
import OwnershipDropdown from '../OwnershipDropdown/Loadable';
import InputField from '../../components/InputField';
import Pincode from '../Pincode/Loadable';
import OptionSelect from '../../components/OptionSelect';
import makeSelectPincode from '../Pincode/selectors';
import { NUMBER_PATTERN } from '../App/constants';

export function AddressInputModal({
  address,
  localities,
  callBack,
  showAddressModal,
  setShowAddressModal,
  actionType,
  heading,
}) {
  useInjectReducer({ key: 'addressInputModal', reducer });
  useInjectSaga({ key: 'addressInputModal', saga });

  const {
    register,
    handleSubmit,
    watch,
    errors,
    // formState,
    clearError,
    setError,
    setValue,
    // reset,
  } = useForm({
    mode: 'onChange',
  });
  const values = watch();
  console.log('AddressInputModal form values', values);

  const setErrorField = (name, type, message) => {
    setError(name, type, message);
  };

  const { location = {} } = localities;

  const handleClose = () => setShowAddressModal(false);

  useEffect(() => {
    if (!_.isEmpty(address)) {
      // Prepopulate form
      const {
        addressLine1,
        addressLine2,
        addressLine3,
        locality,
        pincode,
        durationOfStayInMonths,
        ownershipType,
        contactType,
      } = address;
      setValue([
        { addressLine1 },
        { addressLine2 },
        { addressLine3 },
        { durationOfStay: durationOfStayInMonths },
        { ownership: ownershipType },
        { pin: pincode },
        { locality },
        { addressType: contactType },
      ]);
    }
  }, [address, showAddressModal, localities]);

  const onSubmit = data => {
    const addressObject = {
      id: (address || {}).id || `new-${cuid()}`,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      addressLine3: data.addressLine3,
      city: _.get(location, 'states[0].cities[0].name'),
      contactType: data.addressType,
      ownershipType: data.ownership,
      durationOfStayInMonths: data.durationOfStay,
      country: 'India',
      locality: data.locality,
      pincode: data.pin,
      state: _.get(location, 'states[0].name'),
    };
    console.log('addressObject for callBack', addressObject);
    callBack(addressObject, actionType);
    handleClose();
  };

  return (
    <>
      <Modal
        show={showAddressModal}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{heading || 'Address Form'}</Modal.Title>
        </Modal.Header>
        <div className="progress-form card-body">
          <div className="progress-form-inn">
            <form
              className="clix-form cutomerVerifyForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <VerticalProgressBar values={values} errors={errors} />
              <Modal.Body>
                <div className={`customer-verify-blk ${'active'}`}>
                  <div className="row">
                    <div className="col col-12 col-md-6">
                      <AddressTypeDropdown
                        name="addressType"
                        errors={errors}
                        register={register({ required: true })}
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <OwnershipDropdown
                        name="ownership"
                        errors={errors}
                        register={register({ required: true })}
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="addressLine1"
                        name="addressLine1"
                        register={register({ required: true })}
                        type="text"
                        errors={errors}
                        placeholder="Address Line 1"
                        labelHtml={
                          <label htmlFor="addressLine1">Address Line 1</label>
                        }
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="addressLine2"
                        name="addressLine2"
                        register={register({ required: true })}
                        type="text"
                        errors={errors}
                        placeholder="Address Line 2"
                        labelHtml={
                          <label htmlFor="addressLine2">Address Line 2</label>
                        }
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="addressLine3"
                        name="addressLine3"
                        register={register({ required: true })}
                        type="text"
                        errors={errors}
                        placeholder="Address Line 3"
                        labelHtml={
                          <label htmlFor="addressLine3">Address Line 3</label>
                        }
                      />
                    </div>

                    <div className="col col-12 col-md-6">
                      <Pincode
                        errors={errors}
                        setError={setErrorField}
                        type={values.addressType}
                        currentPincodeValue={
                          !_.isEmpty(address) ? address.pincode : false
                        }
                        maxLength="6"
                        clearError={() => {
                          clearError('pin');
                        }}
                        register={register({
                          required: true,
                          message: 'This field is required',
                          pattern: {
                            value: /[1-9][0-9]{5}/i,
                            message: 'Please enter correct pincode',
                          },
                        })}
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <OptionSelect
                        name="locality"
                        errors={errors}
                        register={register({ required: true })}
                        className="form-control clix-select custom-select"
                        initialValue="Choose Locality"
                        options={_.get(
                          localities,
                          'location.states[0].cities[0].localities',
                          [],
                        )}
                        labelHtml={<label htmlFor="workex">Locality</label>}
                      />
                    </div>

                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="durationOfStay"
                        name="durationOfStay"
                        register={register({
                          required: true,
                          pattern: {
                            value: NUMBER_PATTERN,
                            message: 'Please enter only numbers',
                          },
                        })}
                        type="text"
                        errors={errors}
                        placeholder="Enter Duration of Stay (in months)"
                        labelHtml={
                          <label htmlFor="durationOfStay">
                            Enter Duration of Stay (in months)
                          </label>
                        }
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <button
                  className="btn button btn-lg button-primary arrowBtn"
                  type="submit"
                  // disabled={!formState.isValid}
                >
                  {actionType === 'Update' ? 'Update' : 'Continue'}
                </button>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

AddressInputModal.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  callBack: PropTypes.func.isRequired,
  showAddressModal: PropTypes.bool.isRequired,
  setShowAddressModal: PropTypes.func.isRequired,
  actionType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  addressInputModal: makeSelectAddressInputModal(),
  localities: makeSelectPincode(),
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
)(AddressInputModal);
