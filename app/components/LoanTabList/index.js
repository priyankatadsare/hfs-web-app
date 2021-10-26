/**
 *
 * LoanTabList
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'react-bootstrap';
import LoanDetail from 'components/LoanDetail';
import ClosedLoanDetail from 'components/ClosedLoanDetail';
import messages from './messages';

function LoanTabList({
  runningloans,
  closedloans,
  createRLAApplication,
  masterData,
  createLead,
  fetchLanDetails,
  loanApplications,
}) {
  return (
    <div className="maTabs">
      <Tabs
        defaultActiveKey={runningloans.length ? 'runningLoans' : 'home'}
        id="uncontrolled-tab-example"
        className="nav nav-tabs"
      >
        {runningloans.length ? (
          <Tab eventKey="runningLoans" title="Running Loans">
            <div className="tab-content">
              <div
                className="tab-pane active"
                id="runningLoans"
                role="tabpanel"
                aria-labelledby="runningLoans-tab"
              >
                <div className="am-contBlks ">
                  {runningloans.map(loan => (
                    <LoanDetail
                      loan={loan}
                      createRLAApplication={createRLAApplication}
                      masterData={masterData}
                      createLead={createLead}
                      fetchLanDetails={fetchLanDetails}
                      loanApplications={loanApplications}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Tab>
        ) : (
          <></>
        )}
        {closedloans.length ? (
          <Tab eventKey="home" title="Closed Loans">
            <div className="tab-content">
              <div
                className="tab-pane active"
                id="runningLoans"
                role="tabpanel"
                aria-labelledby="runningLoans-tab"
              >
                <div className="am-contBlks ">
                  {closedloans.map(loan => (
                    <ClosedLoanDetail loan={loan} />
                  ))}
                </div>
              </div>
            </div>
          </Tab>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
}

LoanTabList.propTypes = {};

export default memo(LoanTabList);
