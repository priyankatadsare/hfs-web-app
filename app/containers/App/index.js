/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import GuarantorPage from 'containers/GuarantorPage/Loadable';
import BankDetails from 'containers/BankDetails/Loadable';
import OfferCongratulation from 'containers/OfferCongratulation/Loadable';
import ApplicationReview from 'components/ApplicationReview/Loadable';
import LoanDetails from 'containers/LoanDetails/Loadable';

import ApplicationPage from 'containers/ApplicationPage/Loadable';
import LoanApplications from 'containers/LoanApplications/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import Header from 'components/Header';
import WaitingLoader from 'components/WaitingLoader';
import ServerErrorModal from 'components/ServerErrorModal/Loadable';
import {
  makeSelectWaitingModal,
  makeSelectServerErrorModal,
  makeSelectCurrentUser,
  makeSelectCommonErrorModal,
  makeSelectCommonErroMessage,
} from './selectors';

import GlobalStyle from '../../global-styles';
import {
  showWaitingModal,
  toggleInternalServerModal,
  logOut,
  toggleCommonErrorModal,
} from './actions';
import BorrowerDetails from '../BorrowerDetails/Loadable';
import CommonErrorModal from '../../components/CommonErrorModal';
import DocumentUpload from '../DocumentUpload/Loadable';
import FinalSubmissionPage from '../FinalSubmissionPage/Loadable';

const AppWrapper = styled.div`
  /* max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column; */
`;

const App = ({
  modalState,
  showWaitingModal,
  history,
  internalServerError,
  toggleInternalServerModal,
  toggleCommonErrorModal,
  commonError,
  commonErrorMessage,
  currentUser,
  logOut,
}) => {
  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser]);

  return (
    <>
      <Header currentUser={currentUser} logOut={logOut} />
      <AppWrapper className="main">
        <div className="container">
          <Helmet titleTemplate="%s - HFS App Clix" defaultTitle="HFS App Clix">
            <meta name="description" content="A HFS App Clix application" />
          </Helmet>
          <WaitingLoader show={modalState} handleShow={showWaitingModal} />
          <ServerErrorModal
            show={internalServerError}
            setShow={toggleInternalServerModal}
          />
          <CommonErrorModal
            show={commonError}
            setShow={toggleCommonErrorModal}
            message={commonErrorMessage}
          />
          <Switch>
            <Route exact path="/" component={LoanApplications} />
            <Route exact path="/dashboard/:state" component={DashboardPage} />
            <Route path="/login" component={Login} />
            <Route
              exact
              path="/applications/new"
              // component={BorrowerDetails}
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <BorrowerDetails
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/gurantors"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <GuarantorPage
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/loan_details"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <LoanDetails
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/preview"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <ApplicationReview
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/offer"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <OfferCongratulation
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/documents"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <DocumentUpload
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/banking"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <BankDetails
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid/success"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <FinalSubmissionPage
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            <Route
              path="/applications/:appid"
              render={routerProps => (
                <ApplicationPage
                  activity="CREDIT_REVIEW"
                  component={
                    <BorrowerDetails
                      {...routerProps}
                      requestType="POA"
                      activity="CREDIT_REVIEW"
                    />
                  }
                />
              )}
            />
            {/* <Route path="/applications/:appid" component={BorrowerDetails} /> */}
            {/* <Route exact path="/" component={MyAccountPage} /> */}
            {/* <Route path="/features" component={FeaturePage} /> */}
            <Route path="" component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </div>
      </AppWrapper>
    </>
  );
};

App.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modalState: makeSelectWaitingModal(),
  internalServerError: makeSelectServerErrorModal(),
  currentUser: makeSelectCurrentUser(),
  commonError: makeSelectCommonErrorModal(),
  commonErrorMessage: makeSelectCommonErroMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    showWaitingModal: show => dispatch(showWaitingModal(show)),
    logOut: () => dispatch(logOut()),
    toggleInternalServerModal: show =>
      dispatch(toggleInternalServerModal(show)),
    toggleCommonErrorModal: data => dispatch(toggleCommonErrorModal(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(App);
