/**
 *
 * VerticalProgressBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function VerticalProgressBar({ errors, values }) {
  const progressHeight = () => {
    let filled = Object.values(values).filter(function(el) {
      return (
        el &&
        (el !== 'Total Work Experience' && el !== 'Select your Salary Bank')
      );
    }).length;
    const errorFields = Object.values(errors).filter(
      el => el.type != 'required',
    ).length;
    filled = filled - errorFields;
    const total = Object.keys(values).length;
    return total ? (filled / total) * 100 : 0;
  };
  return (
    <div className="progress">
      <div className="progress-bar" style={{ height: `${progressHeight()}%` }}>
        <span className="circle" style={{ top: `${progressHeight()}%` }} />
      </div>
    </div>
  );
}

VerticalProgressBar.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default memo(VerticalProgressBar);
