/**
 *
 * OtpErrorModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

function OtpErrorModal({ showErrorModal, setShowErrorModal }) {
  return (
    <Modal
      show={showErrorModal}
      onHide={() => setShowErrorModal(false)}
      dialogClassName="modal-dialog modal-dialog-centered model-xs"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <h5 className="modal-title" id="exampleModalLabel">
          OTP Verification
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setShowErrorModal(false)}
        >
          <span aria-hidden="true">
            <i className="clixicon-close" />
          </span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12 text-center">
          <div className="error-img">
            <img src="images/icons/identity-verification-failed.svg" alt="" />
          </div>
        </div>
        <div className="col-12 text-center mt-4 lg-heading">
          <p>
            Oops! <br /> Entered information is either incorrect or does not
            exist.
          </p>
          <p>
            Please dial <a href="tel:1800-200-9898">1800-200-9898</a> or write
            to us at <a href="mailto:hello@clix.capital">hello@clix.capital</a>{' '}
            for further assistance.
          </p>
        </div>
        <div className="col col-12">
          <div className="mt-4 mb-3">
            <button
              className="btn button btn-lg button-primary btn-block arrowBtn"
              type="button"
              onClick={() => setShowErrorModal(false)}
            >
              Retry
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

OtpErrorModal.propTypes = {
  showErrorModal: PropTypes.bool.isRequired,
  setShowErrorModal: PropTypes.func.isRequired,
};

export default OtpErrorModal;
