/**
 *
 * ModelDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectModelDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function ModelDropdown({ name, modelDropdown, dispatch, ...rest }) {
  useInjectReducer({ key: 'modelDropdown', reducer });
  useInjectSaga({ key: 'modelDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.EQUIPMENT));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Model"
      options={modelDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Model</label>}
      {...rest}
    />
  );
}

ModelDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modelDropdown: makeSelectModelDropdown(),
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
)(ModelDropdown);
