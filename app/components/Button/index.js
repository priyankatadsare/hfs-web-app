/**
 *
 * Button
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Button({ children, ...rest }) {
  return (
    <div>
      <button {...rest}>
        <>{children}</>
      </button>
    </div>
  );
}

Button.propTypes = {};

export default memo(Button);
