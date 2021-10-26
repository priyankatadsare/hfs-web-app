/**
 *
 * ApplicationPage
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { useRouteMatch } from 'react-router-dom';

import { compose } from 'redux';
import GuarantorPage from 'containers/GuarantorPage/Loadable';
import BankDetails from 'containers/BankDetails/Loadable';
import OfferCongratulation from 'containers/OfferCongratulation/Loadable';
import ApplicationReview from 'components/ApplicationReview/Loadable';
import DisbursalMoney from 'containers/DisbursalMoney';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApplicationPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loadApplicationDetails, newApp } from './actions';

export function ApplicationPage({
  component,
  loadApplicationDetails,
  applicationPage,
  dispatch,
}) {
  useInjectReducer({ key: 'applicationPage', reducer });
  useInjectSaga({ key: 'applicationPage', saga });

  const match = useRouteMatch('/applications/:appid');
  const {
    params: { appid },
  } = match;

  useEffect(() => {
    if (appid === 'new') {
      dispatch(newApp());
    } else {
      loadApplicationDetails(appid);
    }
  }, [appid]);

  return (
    <div>
      {component}
      {/* <GuarantorPage />
      <LoanDetails />
      <BankDetails />
      <ApplicationReview applicationPage={applicationPage} />
      <OfferCongratulation />
      <DisbursalMoney applicationPage={applicationPage}/> */}
    </div>
  );
}

ApplicationPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationPage: makeSelectApplicationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadApplicationDetails: appid => dispatch(loadApplicationDetails(appid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ApplicationPage);
