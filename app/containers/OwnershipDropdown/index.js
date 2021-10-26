/**
 *
 * OwnershipDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOwnershipDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function OwnershipDropdown({
  name,
  ownershipDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'ownershipDropdown', reducer });
  useInjectSaga({ key: 'ownershipDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.OWNERSHIP_TYPE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Ownership Type"
      options={ownershipDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Ownership Type</label>}
      {...rest}
    />
  );
}

OwnershipDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ownershipDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ownershipDropdown: makeSelectOwnershipDropdown(),
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
)(OwnershipDropdown);
