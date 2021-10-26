/**
 *
 * CustomToggle
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import BackButton from 'components/BackButton/Loadable';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
// import styled from 'styled-components';

function CustomToggle({ eventKey, children }) {
  const [btnCollapse, setBtnCollapse] = useState(false);
  // console.log('eventKey', eventKey);
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    setBtnCollapse(btnCollapse);
  });
  const match = useRouteMatch('/applications/:appid/:page') || { params: {} };
  const {
    params: { page },
  } = match;

  return (
    <h5 className="mb-0">
      <button
        type="button"
        className={`btn btn-link ${!btnCollapse ? '' : 'collapsed'}`}
        // onClick={decoratedOnClick}
      >
        {children}
        {page ? <BackButton /> : null}
      </button>
    </h5>
  );
}

CustomToggle.propTypes = {
  eventKey: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default CustomToggle;
