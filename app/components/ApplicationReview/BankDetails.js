import React from 'react';
import _ from 'lodash';
function BankDetails({ bankDetail = {} }) {
  const {
    disbursmentAccHolderName,
    disbursmentAccNumber,
    disbursmentAccType,
    disbursmentBankIfsc,
    disbursmentBankName,
  } = bankDetail;
  return (
    <>
      <div className="d-flex">
        <h4>Bank Details</h4>
      </div>
      <div className="d-flex" />
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Account Holder Name</div>
          <div className="value">{disbursmentAccHolderName}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Bank Name</div>
          <div className="value">{disbursmentBankName}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Account Type</div>
          <div className="value">{disbursmentAccType}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">IFSC Code</div>
          <div className="value">{disbursmentBankIfsc}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Account Number</div>
          <div className="value">{disbursmentAccNumber}</div>
        </div>
      </div>
    </>
  );
}

export default BankDetails;
