/**
 *
 * GenderDropdown
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import OptionSelect from '../OptionSelect';
// import styled from 'styled-components'

function GenderDropdown({ name, ...rest }) {
  const genderOptions = ['Male', 'Female', 'Others'];
  return (
    <OptionSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Gender"
      options={genderOptions}
      labelHtml={<label htmlFor="workex">Select Gender</label>}
      {...rest}
    />
  );
}

GenderDropdown.propTypes = {
  name: PropTypes.string.isRequired,
};

export default memo(GenderDropdown);
