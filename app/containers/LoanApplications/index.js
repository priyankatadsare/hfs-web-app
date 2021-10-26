/**
 *
 * LoanApplications
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { formatDate } from 'utils/helpers';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toLocaleString } from 'utils/helpers';

import makeSelectLoanApplications from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  fetchingApplications,
  fetchAppDetails,
  createRLA_application,
  getMasterRules,
  createLead,
  fetchLanDetails,
} from './actions';
import messages from './messages';
import LoanTabList from 'components/LoanTabList';
import RunningApplication from 'components/RunningApplication/Loadable';
import UserProfile from 'containers/UserProfile/Loadable';
import { RLA_PORTAL_URL } from 'containers/App/constants';

export function LoanApplications({
  fetchingApplications,
  loanApplications,
  createRLAApplication,
  fetchAppDetails,
  fetchMasterRules,
  createLead,
  fetchLanDetails,
}) {
  useInjectReducer({ key: 'loanApplications', reducer });
  useInjectSaga({ key: 'loanApplications', saga });

  const {
    currentLoan = {},
    runningloans = [],
    runningApplication = [],
    closedloans = [],
    appDetails = {},
    masterData = [],
  } = loanApplications;

  useEffect(() => {
    fetchingApplications();
  }, []);

  useEffect(() => {
    if (runningloans.length > 0 && masterData.length === 0) {
      runningloans.forEach(element => {
        fetchMasterRules(element.loanAccountNumber);
      });
    }
  }, [loanApplications.response]);

  useEffect(() => {
    if (appDetails && appDetails.app) {
      console.log('appDetails', appDetails.app.customerLeadRefId);
      var element = document.createElement('a');
      element.href = `${RLA_PORTAL_URL}?id=${appDetails.app.customerLeadRefId}`;
      element.target = `_rla`;
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [appDetails]);

  console.log('currentLoan', currentLoan);
  return (
    <div>
      <Helmet>
        <title>LoanApplications</title>
        <meta name="description" content="Description of LoanApplications" />
      </Helmet>
      <div className="row account-main">
        <div className="col col-12 col-lg-9">
          <div className="am-blocks">
            <div className="am-block">
              <div className="headingBlk d-flex justify-content-between">
                <h1 className="icon-heading">
                  <i className="clixicon-applications" /> My Application
                </h1>

                <a
                  href="https://apply.clix.capital"
                  target="_preview"
                  className="btn button button-customSmall btn-linePrimary"
                >
                  Apply for new loan
                </a>
              </div>
              <div className="sub-heading">Open Applications</div>

              {runningApplication.map(app => (
                <RunningApplication
                  runningApplication={app}
                  fetchAppDetails={fetchAppDetails}
                />
              ))}
            </div>
            {runningloans.length || closedloans.length ? (
              <div className="am-block">
                <div className="headingBlk d-flex justify-content-between">
                  <h2 className="icon-heading">
                    <i className="clixicon-getOffer" /> My Loans
                  </h2>
                </div>
                <LoanTabList
                  runningloans={runningloans}
                  closedloans={closedloans}
                  createRLAApplication={createRLAApplication}
                  masterData={masterData}
                  createLead={createLead}
                  fetchLanDetails={fetchLanDetails}
                  loanApplications={loanApplications}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <UserProfile />
        {/* <div className="col col-12 col-lg-3">
          <div className="maCards">
            <div className="maCard blueCard">
              <div className="maTitle">Quick Links</div>

              <div className="maSubTitle">Payment of Current Loans</div>

              <div className="maCard">
                <div className="iconHead">
                  <i className="clixicon-education" />
                  Education
                </div>

                <div className="flexData mt-4">
                  <div className="flexRow">
                    <span>Loan Amount</span>
                    <strong>
                      <i className="clixicon-rupee" />
                      {toLocaleString(currentLoan.loanAmount)}
                    </strong>
                  </div>

                  <div className="flexRow">
                    <span>Tenure</span>
                    <strong>{`${currentLoan.tenure} months`}</strong>
                  </div>

                  <div className="flexRow">
                    <span>EMI</span>
                    <strong>
                      <i className="clixicon-rupee" />{' '}
                      {toLocaleString(currentLoan.emi)}
                    </strong>
                  </div>
                </div>

                <a
                  href="payment.html"
                  className="mt-3 btn button btn-lg button-primary btn-block arrowBtn"
                >
                  Proceed to Payment
                </a>
              </div>
            </div>

            <div className="maCard">
              <div className="maTitle">Quick Links</div>

              <ul className="cardList">
                <li>
                  <a href="index.html">
                    <i className="clixicon-quick-loan" />
                    Apply for Quick Loan
                  </a>
                </li>
                <li>
                  <a href="personal-details.html">
                    <i className="clixicon-account" />
                    Update Personal Details
                  </a>
                </li>
                <li>
                  <a href="my-document.html">
                    <i className="clixicon-paper" />
                    My Documents
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="clixicon-query" />
                    Raise a Query
                  </a>
                </li>
              </ul>
            </div>

            <div className="maCard">
              <div className="maTitle">Your Credit Report</div>

              <div className="gif-main">
                <img src="credit-score.gif" alt="credit score" />
              </div>

              <div className="text-center mt-3">
                <div className="meterText">Updated 5 days ago</div>
                <a
                  href=""
                  className="mt-3 btn button btn-lg button-primary btn-block arrowBtn"
                >
                  Proceed to Payment
                </a>
                <div className="mt-2">
                  <a href="" className="link ">
                    View Report
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

LoanApplications.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loanApplications: makeSelectLoanApplications(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchingApplications: () => dispatch(fetchingApplications()),
    createRLAApplication: data => dispatch(createRLA_application(data)),
    fetchAppDetails: id => dispatch(fetchAppDetails(id)),
    fetchMasterRules: lan => dispatch(getMasterRules(lan)),
    createLead: data => dispatch(createLead(data)),
    fetchLanDetails: data => dispatch(fetchLanDetails(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoanApplications);
