/**
 *
 * AssetDeploymentDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAssetDeploymentDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function AssetDeploymentDropdown({
  name,
  assetDeploymentDropdown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'AssetDeploymentDropdown', reducer });
  useInjectSaga({ key: 'AssetDeploymentDropdown', saga });

  useEffect(() => {
    // dispatch(getMasterData(MasterNames.AssetDeployment));
  }, []);

  const ASSET_DEPLOYMENT = [
    'Own Address',
    'Third Party Site arrangement(Revenue Sharing)',
  ];

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select AssetDeployment"
      // options={assetDeploymentDropdown.response || []}
      options={ASSET_DEPLOYMENT}
      labelHtml={<label htmlFor="workex">Select AssetDeployment</label>}
      {...rest}
    />
  );
}

AssetDeploymentDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assetDeploymentDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assetDeploymentDropdown: makeSelectAssetDeploymentDropdown(),
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
)(AssetDeploymentDropdown);
