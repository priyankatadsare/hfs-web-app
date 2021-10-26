/**
 *
 * BorrowerType
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBorrowerType from './selectors';
import reducer from './reducer';
import saga from './saga';
import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function BorrowerType({ name, borrowerType, dispatch, ...rest }) {
  useInjectReducer({ key: 'borrowerType', reducer });
  useInjectSaga({ key: 'borrowerType', saga });

  useEffect(() => {
    console.log('typeeeeeeeeee', borrowerType.response)
    dispatch(getMasterData(MasterNames.BORROWER_TYPE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Borrower Type"
      options={borrowerType.response || []}
      labelHtml={<label htmlFor="workex">Select Borrower Type</label>}
      {...rest}
    />
  );
}

BorrowerType.propTypes = {
  dispatch: PropTypes.func.isRequired,
  borrowerType: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  borrowerType: makeSelectBorrowerType(),
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
)(BorrowerType);
