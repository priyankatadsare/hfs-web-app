/**
 *
 * BusinessTypeDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBusinessTypeDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function BusinessTypeDropdown({
  name,
  businessTypeDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'businessTypeDropdown', reducer });
  useInjectSaga({ key: 'businessTypeDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.BUSINESS_TYPE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Business Type"
      options={businessTypeDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Business Type</label>}
      {...rest}
    />
  );
}

BusinessTypeDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  businessTypeDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  businessTypeDropdown: makeSelectBusinessTypeDropdown(),
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
)(BusinessTypeDropdown);
