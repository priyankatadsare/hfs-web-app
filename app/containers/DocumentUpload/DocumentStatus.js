import React from 'react';

function DocumentStatus({ item, name }) {
  const { type = '', fileName = '' } = item;

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Document Name</div>
          <div className="value">{`${fileName}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Document Type</div>
          <div className="value">{`${type}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Status</div>
          <div className="value">Uploaded</div>
        </div>
      </div>
    </>
  );
}

export default DocumentStatus;
