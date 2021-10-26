/**
 *
 * RunningApplication
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
function RunningApplication({ runningApplication, hideCTA }) {
  return (
    <>
      <div className="am-contBlk app-prev">
        <div>
          <div className="title">
            Loan Application
            <span className="tag">{runningApplication.state}</span>
          </div>
          <div className="app-detail d-flex">
            <div className="app-detailBlk">
              <span>Name</span>
              {runningApplication.customerName ||
                runningApplication.customer_name}
            </div>
            <div className="app-detailBlk">
              <span>PAN</span>
              {runningApplication.panNumber || runningApplication.pan_number}
            </div>
          </div>
        </div>
        <div>
          {runningApplication.state === 'ACTIVE' && !hideCTA ? (
            <Link
              to={`/applications/${runningApplication.applicationId}`}
              className="btn button button-primary button-customSmall"
            >
              Complete Now
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}

RunningApplication.propTypes = {};

export default memo(RunningApplication);
