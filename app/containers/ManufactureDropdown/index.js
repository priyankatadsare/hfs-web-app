/**
 *
 * ManufactureDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectManufactureDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function ManufactureDropdown({
  name,
  manufactureDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'manufactureDropdown', reducer });
  useInjectSaga({ key: 'manufactureDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.MANUFACTURER));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Manufacturer"
      options={manufactureDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Manufacturer</label>}
      {...rest}
    />
  );
}

ManufactureDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  manufactureDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manufactureDropdown: makeSelectManufactureDropdown(),
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
)(ManufactureDropdown);
