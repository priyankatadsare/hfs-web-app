/**
 *
 * SupplierDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSupplierDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function SupplierDropdown({
  name,
  supplierDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'supplierDropdown', reducer });
  useInjectSaga({ key: 'supplierDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.SUPPLIER));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Supplier"
      options={supplierDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Supplier</label>}
      {...rest}
    />
  );
}

SupplierDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  supplierDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  supplierDropdown: makeSelectSupplierDropdown(),
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
)(SupplierDropdown);
