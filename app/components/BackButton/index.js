/**
 *
 * BackButton
 *
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BackButton() {
  const history = useHistory();
  const handleUpdate = event => {
    event.preventDefault();
    history.goBack();
  };
  return (
    <button
      style={{
        float: 'right',
        height: 'auto',
        lineHeight: 'normal',
        color: '#d5d5d5',
      }}
      type="button"
      className="btn button"
      onClick={handleUpdate}
    >
      Back
    </button>
  );
}

BackButton.propTypes = {};

export default BackButton;
