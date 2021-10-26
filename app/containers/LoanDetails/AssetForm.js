import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';
import _ from 'lodash';
import { NUMBER_PATTERN, DECIMAL_PATTERN } from 'containers/App/constants';
import AssetConditionDropdown from 'containers/AssetConditionDropdown/Loadable';
import AssetTypeDropdown from 'containers/AssetTypeDropdown/Loadable';
import ManufactureDropdown from 'containers/ManufactureDropdown/Loadable';
import SupplierDropdown from 'containers/SupplierDropdown/Loadable';
import ModelDropdown from 'containers/ModelDropdown/Loadable';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import InputField from 'components/InputField';
import InputTextArea from 'components/InputTextArea';
import { isJson } from '../../utils/helpers';
import MarginMoneyDropdown from '../MarginMoneyDropdown/Loadable';
import AssetDeploymentDropdown from '../AssetDeploymentDropdown/Loadable';
import makeSelectAssetTypeDropdown from '../AssetTypeDropdown/selectors';
import makeSelectSupplierDropdown from '../SupplierDropdown/selectors';

function AssetForm({
  setValue,
  handleSaveAddress,
  asset = {},
  register,
  values,
  errors,
  reset,
  setError,
  appDetails,
  assetDropdown,
  supplierDropdown,
}) {
  const { masterAssetType = {} } = assetDropdown;
  let {
    brand = '',
    description = '{}',
    assetType = '',
    assetPrice = 0,
    assetCondition = '',
    assetUnit = '',
    assetMarginMoney = '',
    assetInstallationPlace = '',
    assetModel = '',
    assetDealer = '',
    marginMoney = '',
  } = asset;
  let {
    // assetType,
    // assetPrice = 0,
    // assetCondition,
    // model,
    // assetUnits,
    // marginMoney,
    // assetDeployment,
    downPaymentMode,
    assetTypeTextValue = false,
    supplierTextValue = false,
    // supplierName = false,
    // machineModel,
  } = isJson(description) ? JSON.parse(description) : {};
  useEffect(() => {
    // Pre-populate fields logic
    setValue([
      { manufacturer: brand },
      { assetPrice: assetPrice ? parseFloat(assetPrice) / 100000 : '' },
      { assetUnit },
      { assetCondition },
      { assetMarginMoney },
      { assetInstallationPlace },
      { downPaymentMode },
      { assetModel },
      { marginMoney },
    ]);

    if (
      masterAssetType &&
      Object.keys(masterAssetType).length > 0 &&
      Object.keys(masterAssetType).indexOf(assetType) < 0
    ) {
      assetTypeTextValue = assetType;
      assetType = 'OTHERS';
    }

    setValue([{ assetType }, { assetTypeTextValue }]);

    if (
      supplierDropdown.response &&
      supplierDropdown.response.length > 0 &&
      supplierDropdown.response.indexOf(assetDealer) < 0
    ) {
      supplierTextValue = assetDealer;
      assetDealer = 'Others';
    }
    setValue([{ assetDealer }, { supplierTextValue }]);
  }, [asset]);

  const [assetTypeOthers, setassetTypeOthers] = useState(false);
  const [supplierOthers, setsupplierOthers] = useState(false);
  const [thirdPartyAddress, setThirdPartyAddress] = useState(false);
  // const [showNameOfSupplier, setshowNameOfSupplier] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(values) && values.assetType.toLowerCase() === 'others') {
      setassetTypeOthers(true);
      return;
    }
    setassetTypeOthers(false);
  }, [values.assetType]);

  useEffect(() => {
    if (!_.isEmpty(values) && values.assetDealer.toLowerCase() === 'others') {
      setsupplierOthers(true);
      return;
    }
    setsupplierOthers(false);
  }, [values.assetDealer]);

  useEffect(() => {
    if (
      !_.isEmpty(values) &&
      values.assetInstallationPlace ===
        'Third Party Site arrangement(Revenue Sharing)'
    ) {
      setThirdPartyAddress(true);
      return;
    }
    setThirdPartyAddress(false);
  }, [values.assetInstallationPlace]);

  // useEffect(() => {
  //   if (
  //     !_.isEmpty(values) &&
  //     values.assetCondition.toLowerCase() === 'refurbished'
  //   ) {
  //     setshowNameOfSupplier(true);
  //     return;
  //   }
  //   setshowNameOfSupplier(false);
  // }, [values.assetCondition]);

  const usedAssets = _.reject(
    _.map(
      _.get(appDetails, 'appResponse.appCollaterals', []),
      item => JSON.parse(_.get(item, 'description')).assetType,
    ),
    elem => elem === assetType,
  );

  const assetIsUnique = async asetType => !usedAssets.includes(asetType);

  return (
    <>
      <div className="row">
        <div className="col col-12 col-md-6">
          <ManufactureDropdown
            name="manufacturer"
            errors={errors}
            register={register({ required: true })}
          />
        </div>
        {/* <div className="col col-12 col-md-6">
          <ModelDropdown
            name="model"
            errors={errors}
            register={register({ required: true })}
          />
        </div> */}
        <div className="col col-12 col-md-6">
          <AssetConditionDropdown
            name="assetCondition"
            errors={errors}
            register={register({ required: true })}
          />
        </div>

        <div className="col col-12 col-md-6">
          <SupplierDropdown
            name="assetDealer"
            errors={errors}
            register={register({ required: true })}
          />
        </div>
        {supplierOthers && (
          <div className="col col-12 col-md-6">
            <InputField
              className="form-control"
              id="supplierTextValue"
              name="supplierTextValue"
              register={register({
                required: true,
              })}
              type="text"
              errors={errors}
              placeholder="Other Supplier"
              labelHtml={<label htmlFor="assetPrice">Supplier</label>}
            />
          </div>
        )}

        <div className="col col-12 col-md-6">
          <AssetTypeDropdown
            name="assetType"
            errors={errors}
            register={register({ required: true, validate: assetIsUnique })}
          />
        </div>
        {assetTypeOthers && (
          <div className="col col-12 col-md-6">
            <InputField
              className="form-control"
              id="assetTypeTextValue"
              name="assetTypeTextValue"
              register={register({
                required: true,
                // pattern: {
                //   value: NUMBER_PATTERN,
                //   message: 'Please enter numbers only',
                // },
              })}
              type="text"
              errors={errors}
              placeholder="Enter Asset Type"
              labelHtml={<label htmlFor="assetPrice">Asset Type</label>}
            />
          </div>
        )}
        <div className="col col-12 col-md-6">
          <MarginMoneyDropdown
            name="assetMarginMoney"
            errors={errors}
            register={register({ required: true })}
          />
        </div>
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="marginMoney"
            name="marginMoney"
            register={register({
              required: false,
              pattern: {
                value: NUMBER_PATTERN,
                message: 'Please enter number only',
              },
            })}
            type="text"
            errors={errors}
            placeholder="Enter Margin Money amount"
            labelHtml={
              <label htmlFor="marginMoney">Margin Money amount</label>
            }
          />
        </div>
        <div className="col col-12 col-md-6">
          <AssetDeploymentDropdown
            name="assetInstallationPlace"
            errors={errors}
            register={register({ required: true })}
          />
        </div>
        {thirdPartyAddress && (
          <div className="col col-12 col-md-6">
            <InputTextArea
              className="form-control"
              id="collateralLocation"
              name="collateralLocation"
              register={register({
                required: false,
              })}
              type="textarea"
              errors={errors}
              placeholder="Third Party Address"
              labelHtml={
                <label htmlFor="collateralLocation">Third Party Address</label>
              }
            />
          </div>
        )}
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="assetPrice"
            name="assetPrice"
            register={register({
              required: true,
              pattern: {
                value: DECIMAL_PATTERN,
                message: 'Please enter number/decimal only',
              },
            })}
            type="text"
            errors={errors}
            placeholder="Enter unit price in Lac rupees (Inclusive of GST)"
            labelHtml={
              <label htmlFor="assetPrice">Unit Price(in Lac Rs)</label>
            }
          />
        </div>
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="assetUnit"
            name="assetUnit"
            default={1}
            register={register({
              required: true,
              pattern: {
                value: NUMBER_PATTERN,
                message: 'Please enter numbers only',
              },
            })}
            type="text"
            errors={errors}
            placeholder="Units Required"
            labelHtml={<label htmlFor="assetUnit">Units Required</label>}
          />
        </div>
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="assetModel"
            name="assetModel"
            register={register({
              required: true,
            })}
            type="text"
            errors={errors}
            placeholder="Machine Model"
            labelHtml={<label htmlFor="assetModel">Machine Model</label>}
          />
        </div>
        {/* <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="downPaymentMode"
            name="downPaymentMode"
            register={register({
              required: true,
            })}
            type="text"
            errors={errors}
            placeholder="Enter Down Payment Mode"
            labelHtml={<label htmlFor="assetPrice">Down Payment Mode</label>}
          />
        </div> */}
        {/* <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="loanAmount"
            name="loanAmount"
            register={register({
              required: true,
              pattern: {
                value: NUMBER_PATTERN,
                message: 'Please enter numbers only',
              },
            })}
            type="text"
            errors={errors}
            placeholder="Enter Loan Amount"
            labelHtml={<label htmlFor="loanAmount">Loan Amount</label>}
          />
        </div>
        <div className="col col-12 col-md-6">
          <TenureDropdown
            name="loanTenure"
            errors={errors}
            register={register({ required: true })}
          />
        </div> */}
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  appDetails: makeSelectApplicationPage(),
  assetDropdown: makeSelectAssetTypeDropdown(),
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

export default compose(withConnect)(AssetForm);
