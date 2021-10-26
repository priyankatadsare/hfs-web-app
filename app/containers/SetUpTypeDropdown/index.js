/**
 *
 * SetUpTypeDropdownDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSetUpTypeDropdownDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function SetUpTypeDropdownDropdown({
  name,
  setUpTypeDropdownDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'SetUpTypeDropdownDropdown', reducer });
  useInjectSaga({ key: 'SetUpTypeDropdownDropdown', saga });

  useEffect(() => {
    // dispatch(getMasterData(MasterNames.SetUpTypeDropdown));
  }, []);

  const SETUP_TYPES = [
    'Diagnostic Center',
    'Hospital',
    'Nursing Home',
    'Day Care',
    'Others',
  ];

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Setup Type"
      // options={setUpTypeDropdownDropdown.response || []}
      options={SETUP_TYPES}
      labelHtml={<label htmlFor="workex">Select Setup Type</label>}
      {...rest}
    />
  );
}

SetUpTypeDropdownDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setUpTypeDropdownDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SetUpTypeDropdownDropdown: makeSelectSetUpTypeDropdownDropdown(),
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
)(SetUpTypeDropdownDropdown);
