import React, { useMemo } from 'react';
import _ from 'lodash';
import { formatToCurrency, toLocaleString } from 'utils/helpers';

function LoanDetails({ appCollaterals = [], loanOffers = [] }) {
  const appliedOffer =
    _.sortBy(
      _.filter(loanOffers, { type: 'applied_amount' }),
      'id',
      'desc',
    )[0] || {};

  let totalValueOfAllAssets = 0;

  // const appCollateral = _.sortBy(appCollaterals, 'id', 'desc') || {};
  // const { assetType, assetPrice, assetCondition, assetUnits } = JSON.parse(
  //   appCollateral.description || '{}',
  // );

  const calculateAssetPrice = (units, unitPrice) =>
    parseInt(units, 10) * parseInt(unitPrice, 10);

  return (
    <>
      {appCollaterals.map((appCollateral, index) => {
        const {
          assetType = '',
          assetPrice = 0,
          assetCondition,
          // model,
          assetUnit,
          assetMarginMoney,
          assetInstallationPlace,
          downPaymentMode,
          assetTypeTextValue = false,
          assetDealer = false,
        } = appCollateral;

        const totalAssetPrice = calculateAssetPrice(assetUnit, assetPrice);

        totalValueOfAllAssets += totalAssetPrice;

        return (
          <>
            <div className="d-flex">
              <h4>{`Asset Details ${index + 1}`}</h4>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Manfacturer</div>
                <div className="value">{`${appCollateral.brand}`}</div>
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
                <div className="name">Asset Condition</div>
                <div className="value">{`${assetCondition}`}</div>
              </div>
              {assetDealer && (
                <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                  <div className="name">Supplier Name</div>
                  <div className="value">{`${assetDealer}`}</div>
                </div>
              )}
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
              {/* <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
              <div className="name">Asset Model</div>
              <div className="value">{model}</div>
            </div> */}
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Unit Price</div>
                <div className="value">{formatToCurrency(assetPrice)}</div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Asset Units</div>
                <div className="value">{assetUnit}</div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Asset Price</div>
                <div className="value">
                  {toLocaleString(totalAssetPrice, true)}
                </div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Margin Money</div>
                <div className="value">{assetMarginMoney}</div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Asset Deployment</div>
                <div className="value">{assetInstallationPlace}</div>
              </div>
              {/* <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Down Payment Mode</div>
                <div className="value">{downPaymentMode}</div>
              </div> */}
            </div>
            <hr className="mt-4 mb-4" />
          </>
        );
      })}
      <div className="d-flex">
        <h4>Loan Details</h4>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Total Assets Value</div>
          <div className="value">
            {toLocaleString(totalValueOfAllAssets, true)}
          </div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Loan Amount</div>
          <div className="value">
            {formatToCurrency(appliedOffer.loanAmount)}
          </div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Loan Tenure</div>
          <div className="value">{appliedOffer.loanTenure}</div>
        </div>
        {/* <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">ROI</div>
          <div className="value">{appliedOffer.roi}</div>
        </div> */}
      </div>
    </>
  );
}

export default LoanDetails;
