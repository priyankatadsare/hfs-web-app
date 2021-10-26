/**
 *
 * ProgramTypeDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProgramTypeDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';
import OptionSelect from '../../components/OptionSelect';

export function ProgramTypeDropdown({
  name,
  programTypeDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'ProgramTypeDropdown', reducer });
  useInjectSaga({ key: 'ProgramTypeDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.PROGRAM_TYPE));
  }, []);

  const { masterProgData = {} } = programTypeDropdown;

  return (
    <OptionSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Program Type"
      options={Object.keys(masterProgData) || []}
      labelHtml={<label htmlFor="workex">Select Program Type</label>}
      {...rest}
    />
  );
}

ProgramTypeDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  programTypeDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  programTypeDropdown: makeSelectProgramTypeDropdown(),
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
)(ProgramTypeDropdown);
