/**
 *
 * KnockoutRuleModal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function KnockoutRuleModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Restructuring Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>OOPS!</h4> */}
        <p>
          Selected LAN is not eligible for restructuring as per RBI
          restructuring policies.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to="#"
          className="btn button button-primary"
          onClick={props.onHide}
          style={{ marginTop: '0' }}
        >
          Close
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

KnockoutRuleModal.propTypes = {};

export default KnockoutRuleModal;
