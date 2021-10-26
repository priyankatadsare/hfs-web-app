/**
 *
 * WorkExperienceDropdownDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWorkExperienceDropdownDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function WorkExperienceDropdownDropdown({
  name,
  workExperienceDropdownDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'WorkExperienceDropdownDropdown', reducer });
  useInjectSaga({ key: 'WorkExperienceDropdownDropdown', saga });

  useEffect(() => {
    // dispatch(getMasterData(MasterNames.WorkEX));
  }, []);

  const WORK_EX = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Business Vintage(in years)"
      // options={workExperienceDropdownDropdown.response || []}
      options={WORK_EX}
      labelHtml={
        <label htmlFor="workex">Select Business Vintage(in years) </label>
      }
      {...rest}
    />
  );
}

WorkExperienceDropdownDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  workExperienceDropdownDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  WorkExperienceDropdownDropdown: makeSelectWorkExperienceDropdownDropdown(),
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
)(WorkExperienceDropdownDropdown);
