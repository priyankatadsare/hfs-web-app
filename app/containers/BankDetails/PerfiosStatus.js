import React from 'react';

function PerfiosStatus({ item, index, perfiosAbbreviations }) {
  const {
    institutionCode = '',
    yearMonthFrom = '',
    yearMonthTo = '',
    status = '',
  } = item;

  return (
    <>
      <div className="d-flex">
        <h4>{`Status ${index}`} &nbsp;</h4>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Bank</div>
          <div className="value">{`${institutionCode}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">From</div>
          <div className="value">{`${yearMonthFrom}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">To</div>
          <div className="value">{yearMonthTo}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Status</div>
          <div className="value">{perfiosAbbreviations[status]}</div>
        </div>
      </div>
    </>
  );
}

export default PerfiosStatus;
