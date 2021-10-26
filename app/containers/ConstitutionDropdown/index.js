/**
 *
 * ConstitutionDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectConstitutionDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function ConstitutionDropdown({
  name,
  constitutionDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'constitutionDropdown', reducer });
  useInjectSaga({ key: 'constitutionDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.CONSTITUTION));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Constitution"
      options={constitutionDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Constitution</label>}
      {...rest}
    />
  );
}

ConstitutionDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  constitutionDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  constitutionDropdown: makeSelectConstitutionDropdown(),
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
)(ConstitutionDropdown);
