/**
 *
 * TenureDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTenureDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function TenureDropdown({ name, tenureDropdown, dispatch, ...rest }) {
  useInjectReducer({ key: 'tenureDropdown', reducer });
  useInjectSaga({ key: 'tenureDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.TENURE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Tenure"
      options={tenureDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Tenure</label>}
      {...rest}
    />
  );
}

TenureDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tenureDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tenureDropdown: makeSelectTenureDropdown(),
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
)(TenureDropdown);
