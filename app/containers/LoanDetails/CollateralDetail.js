import React, { useMemo } from 'react';
import { isJson, toLocaleString } from '../../utils/helpers';

function CollateralDetail({ asset, setcurrentAsset, formRef, index }) {
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
  } = asset;
  const {
    //assetType,
    //assetPrice = '',
    //assetCondition,
    // model,
    //assetUnits,
    //marginMoney,
    //assetDeployment,
    downPaymentMode,
    //assetTypeTextValue = false,
    //supplierTextValue = false,
    //supplierName = false,
    //machineModel = false,
  } = isJson(description) ? JSON.parse(description) : {};
  const handleClick = e => {
    e.preventDefault();
    setcurrentAsset(asset);
    setTimeout(() => {
      formRef.current.scrollIntoView();
    }, 1000);
  };

  const calculateAssetPrice = (units, unitPrice) =>
    parseInt(units, 10) * parseInt(unitPrice, 10);

  const totalAssetPrice = useMemo(
    () => calculateAssetPrice(assetUnit, assetPrice),
    [assetUnit, assetPrice],
  );

  return (
    <>
      <div className="d-flex">
        <a onClick={handleClick}>
          <h4>{`Asset ${index}`} &nbsp; &#9998;</h4>
        </a>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Manfacturer</div>
          <div className="value">{`${brand}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Type</div>
          <div className="value">{`${
            assetType.toLowerCase() === 'others'
              ? assetTypeTextValue
              : assetType
          }`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Unit Price</div>
          <div className="value">
            {toLocaleString(parseFloat(assetPrice), true)}
          </div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Units</div>
          <div className="value">{assetUnit}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Price</div>
          <div className="value">{toLocaleString(totalAssetPrice, true)}</div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Condition</div>
          <div className="value">{`${assetCondition}`}</div>
        </div>
        {assetDealer && (
          <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
            <div className="name">Supplier Name</div>

            <div className="value">{`${assetDealer}`}</div>
          </div>
        )}
        {/* <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Model</div>
          <div className="value">{model}</div>
        </div> */}
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Margin Money</div>
          <div className="value">{assetMarginMoney}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Asset Deployment</div>
          <div className="value">{assetInstallationPlace}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Machine Model</div>
          <div className="value">{assetModel}</div>
        </div>
        {/* <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Down Payment Mode</div>
          <div className="value">{downPaymentMode}</div>
        </div> */}
      </div>
    </>
  );
}

export default CollateralDetail;
