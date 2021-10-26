/**
 *
 * AssetTypeDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAssetTypeDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function AssetTypeDropdown({
  name,
  assetTypeDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'assetTypeDropdown', reducer });
  useInjectSaga({ key: 'assetTypeDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.ASSET_TYPE));
  }, []);

  const {
    masterAssetType = {},
  } = assetTypeDropdown;

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Asset Type"
      options={Object.keys(masterAssetType) || []}
      labelHtml={<label htmlFor="workex">Select Asset Type</label>}
      {...rest}
    />
  );
}

AssetTypeDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assetTypeDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assetTypeDropdown: makeSelectAssetTypeDropdown(),
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
)(AssetTypeDropdown);
