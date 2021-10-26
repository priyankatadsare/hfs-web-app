/**
 *
 * CommonErrorModal
 *


/**
 *
 * CommonErrorModal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

function CommonErrorModal({ show, setShow, message = 'Something went wrong' }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-dialog modal-dialog-centered model-xs"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <h5 className="modal-title" id="exampleModalLabel">
          Something went wrong
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
        <div className="col-12 text-center">
          <div className="error-img">
            <img src="images/icons/identity-verification-failed.svg" alt="" />
          </div>
        </div>
        <div className="col-12 text-center mt-4 lg-heading">
          <p>{message}</p>
        </div>
        <div className="col col-12">
          <div className="mt-4 mb-3">
            <button
              className="btn button btn-lg button-primary btn-block arrowBtn"
              type="button"
              onClick={() => setShow(false)}
            >
              Retry
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

CommonErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default memo(CommonErrorModal);
