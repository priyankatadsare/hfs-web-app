/**
 *
 * WaitingLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
// import styled from 'styled-components';

function WaitingLoader({
  message = 'Processing your request. Please be with us',
  style = {},
  show,
  handleShow,
}) {
  return (
    <Modal
      // className="modal fade"
      dialogClassName="modal-dialog modal-dialog-centered model-loader"
      show={show}
      // onHide={() => handleShow(false)}
      // size="lg"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="col-12 text-center">
          <div className="error-img mt-3">
            <img src="waiting-loader-loop.gif" alt="" />
          </div>
        </div>
        <div className="col-12 text-center mt-4 lg-heading">
          <p>{message}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

WaitingLoader.propTypes = {
  message: PropTypes.string,
};

export default WaitingLoader;
