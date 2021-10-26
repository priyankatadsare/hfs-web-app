/**
 *
 * MarginMoneyDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMarginMoneyDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function MarginMoneyDropdown({
  name,
  marginMoneyDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'MarginMoneyDropdown', reducer });
  useInjectSaga({ key: 'MarginMoneyDropdown', saga });

  useEffect(() => {
    // dispatch(getMasterData(MasterNames.MarginMoney));
  }, []);

  const MARGIN_MONEY = ['Cash Margin'];

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select MarginMoney"
      // options={marginMoneyDropdown.response || []}
      options={MARGIN_MONEY}
      labelHtml={<label htmlFor="workex">Select MarginMoney</label>}
      {...rest}
    />
  );
}

MarginMoneyDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  marginMoneyDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  marginMoneyDropdown: makeSelectMarginMoneyDropdown(),
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
)(MarginMoneyDropdown);
