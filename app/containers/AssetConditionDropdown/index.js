/**
 *
 * AssetConditionDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAssetConditionDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function AssetConditionDropdown({
  name,
  assetConditionDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'assetConditionDropdown', reducer });
  useInjectSaga({ key: 'assetConditionDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.ASSET_CONDITION));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Asset Condition"
      options={assetConditionDropdown.response || []}
      labelHtml={<label htmlFor="workex">Select Asset Condition</label>}
      {...rest}
    />
  );
}

AssetConditionDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assetConditionDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assetConditionDropdown: makeSelectAssetConditionDropdown(),
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
)(AssetConditionDropdown);
