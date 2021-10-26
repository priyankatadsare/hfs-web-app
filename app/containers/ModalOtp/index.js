/**
 *
 * ModalOtp
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectModalOtp, {
  makeSelectRequestId,
  makeSelectOTPSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectFormData } from '../Login/selectors';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import { MOBILE_PATTERN } from '../App/constants';
import './styles.css';
import { validateOTP, setShowModal, sendOTP } from './actions';
import Modal from 'react-bootstrap/Modal';

export function ModalOtp({
  formData,
  resendOtp,
  requestId,
  validateOtp,
  modalOtp,
  setShow,
}) {
  useInjectReducer({ key: 'modalOtp', reducer });
  useInjectSaga({ key: 'modalOtp', saga });

  console.log('formData', formData);

  const [isMobile, setIsMobile] = useState(false);

  const {
    handleSubmit,
    register,
    errors,
    setError,
    clearError,
    watch,
    formState,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('otp', '');
    if (MOBILE_PATTERN.test(formData.mobileOrEmail)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [formData.mobileOrEmail]);

  useEffect(() => {
    const { error } = modalOtp.error;
    if (error && error.message == 'OTP invalid') {
      setError('otp', 'pattern', 'Invalid OTP submitted');
    }
  }, [modalOtp.error]);

  const onSubmit = data => {
    console.log('data for otp', data);
    data = {
      otp_code: data.otp,
      request_id: requestId,
    };
    validateOtp(data);
  };

  return (
    <Modal
      show={modalOtp.showModal}
      onHide={() => setShow(false)}
      dialogClassName="modal-dialog modal-dialog-centered text-center"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <h5 className="modal-title" id="exampleModalLabel">
          Verify your {isMobile ? 'Phone Number' : 'Email Address'}
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setShow(false)}
        >
          <span aria-hidden="true">
            <i className="clixicon-close" />
          </span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="otp-msg">
              OTP has been sent on <strong>{formData.mobileOrEmail}</strong>
            </div>
            <div className="otp-group mt-2">
              <div className="otp-inner">
                <InputField
                  type="text"
                  name="otp"
                  className="form-control otp-input"
                  maxLength="4"
                  errors={errors}
                  register={register({
                    required: true,
                    minLength: { value: 4 },
                  })}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={!formState.isValid}
                className="btn button button-primary submitOtp arrowBtn"
                aria-label="Close"
              >
                Submit
              </button>
              <div className="mt-1" />
              <a href="#" className="link" onClick={() => resendOtp(formData)}>
                <strong>Resend OTP</strong>
              </a>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

ModalOtp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  modalOtp: makeSelectModalOtp(),
  requestId: makeSelectRequestId(),
  otpSuccess: makeSelectOTPSuccess(),
  formData: makeSelectFormData(),
});

function mapDispatchToProps(dispatch) {
  return {
    resendOtp: formData => {
      let data = {
        ...formData,
        cuid: '',
      };
      dispatch(sendOTP(data));
    },
    validateOtp: data => {
      dispatch(validateOTP(data));
    },
    setShow: data => {
      dispatch(setShowModal(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ModalOtp);
