/**
 *
 * QualificationDropDown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectQualificationDropDown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function QualificationDropDown({
  name,
  qualificationDropDown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'qualificationDropDown', reducer });
  useInjectSaga({ key: 'qualificationDropDown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.QUALIFICATION));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Qualification"
      options={qualificationDropDown.response || []}
      labelHtml={<label htmlFor="workex">Select Qualification</label>}
      {...rest}
    />
  );
}

QualificationDropDown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  qualificationDropDown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  qualificationDropDown: makeSelectQualificationDropDown(),
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
)(QualificationDropDown);
