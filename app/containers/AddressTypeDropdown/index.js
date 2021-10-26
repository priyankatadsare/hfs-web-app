/**
 *
 * AddressTypeDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddressTypeDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';
import MasterOptionSelect from '../../components/MasterOptionSelect';

export function AddressTypeDropdown({
  name,
  addressTypeDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'addressTypeDropdown', reducer });
  useInjectSaga({ key: 'addressTypeDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.ADDRESS_TYPE));
  }, []);

  return (
    <MasterOptionSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Address Type"
      options={addressTypeDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Address Type</label>}
      {...rest}
    />
  );
}

AddressTypeDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addressTypeDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addressTypeDropdown: makeSelectAddressTypeDropdown(),
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
)(AddressTypeDropdown);
