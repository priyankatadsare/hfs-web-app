/**
 *
 * BusinessProfileDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBusinessProfileDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function BusinessProfileDropdown({
  name,
  businessProfileDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'businessProfileDropdown', reducer });
  useInjectSaga({ key: 'businessProfileDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.BUSINESS_PROFILE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Business Profile"
      options={businessProfileDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Business Profile</label>}
      {...rest}
    />
  );
}

BusinessProfileDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  businessProfileDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  businessProfileDropdown: makeSelectBusinessProfileDropdown(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BusinessProfileDropdown);
