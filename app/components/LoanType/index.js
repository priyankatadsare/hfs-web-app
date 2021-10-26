/**
 *
 * LoanType
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Wrapper from './style';

function LoanType({ loanType, children }) {
  return (
    <Wrapper
      className="app-detailBlk ltitle"
      // style={{ lineHeight: 'unset', minWidth: '120px' }}
    >
      <i className="clixicon-loan-requirement" />

      <span>{loanType}</span>
      {children}
    </Wrapper>
  );
}

LoanType.propTypes = {};

export default LoanType;
