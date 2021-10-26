/**
 *
 * OfferCongratulation
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toLocaleString } from 'utils/helpers';
import { Accordion, Card } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import CustomToggle from 'components/CustomToggle';
import _ from 'lodash';
import NextAction from 'containers/NextAction/Loadable';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import NoOffer from '../../components/NoOffer';
import makeSelectOfferCongratulation from './selectors';
import reducer from './reducer';
import saga from './saga';
import offerMp4 from '../../images/icons/offer.mp4';
import { UIStages } from '../App/constants';
import { loadApplicationDetails } from '../ApplicationPage/actions';
import Skelton from '../../components/Skelton';
import waitingImg from '../../images/waiting-loader-loop.gif';

export function OfferCongratulation({
  offerCongratulation,
  dispatch,
  appDetails,
}) {
  useInjectReducer({ key: 'offerCongratulation', reducer });
  useInjectSaga({ key: 'offerCongratulation', saga });

  useEffect(() => {
    if (appid) dispatch(loadApplicationDetails(appid));
  }, [appid]);
  // const { uiStage } = _.get(appDetails, 'leadResponse.details', {});
  const [showOffer, setshowOffer] = useState(false);
  const [showPendingScreen, setshowPendingScreen] = useState(true);
  const users = _.get(appDetails, 'appResponse.users', []);
  // const appid = _.get(appDetails, 'appResponse.appid');
  const match = useRouteMatch('/applications/:appid');
  const {
    params: { appid },
  } = match;
  const customerName = users.map(user =>
    _.upperCase(_.get(user, 'type', '')) === 'INDIVIDUAL'
      ? `${_.get(user, 'firstName')} ${_.get(user, 'lastName')}`
      : _.get(user, 'registeredName') ||
        `${_.get(user, 'firstName')} ${_.get(user, 'lastName')}`,
  );

  // const { calculated_variables = {}, decision = {}, eligibility = [] } =
  //   _.get(appDetails, 'leadResponse.details.data.bureau_response', {}) || {};

  const { loanOffers = [], applicationStatus = '', rejectReason = '' } =
    _.get(appDetails, 'appResponse', {}) || {};

  const currentLoanOffer =
    _.find(_.orderBy(loanOffers, 'id', 'desc'), {
      type: 'eligible_amount',
    }) || {};
  let { loanAmount = 0 } = currentLoanOffer;
  loanAmount = parseInt(loanAmount, 10);

  useEffect(() => {
    if (applicationStatus && applicationStatus.includes('APPROVED')) {
      setshowOffer(true);
      setshowPendingScreen(false);
    } else if (applicationStatus && applicationStatus.includes('REJECTED')) {
      setshowOffer(false);
      setshowPendingScreen(false);
    } else {
      // Pending Screen
      setshowPendingScreen(true);

      // setshowOffer(false);
      // setshowPendingScreen(false);
    }
  }, [applicationStatus]);

  // if (calculated_variables.segment === 'A1' && loanAmount > 1000000) {
  //   loanAmount = 1000000;
  // }
  loanAmount = Math.floor(loanAmount / 1000) * 1000;
  // loanAmount = 100000;

  // if (!loanAmount && !offerCongratulation.loading) {
  //   return (
  //     <NoOffer
  //       loanAmount={loanAmount}
  //       rejectReview={decision.reject_review}
  //       rejectReason={rejectReason}
  //       applicationStatus={applicationStatus}
  //       customerName={customerName}
  //       appid={appid}
  //     />
  //   );
  // }
  // if (
  //   applicationStatus !== 'CREDIT_APPROVED' &&
  //   decision.status !== 'Accept' &&
  //   decision.reject_review &&
  //   !offerCongratulation.loading
  // ) {
  //   return (
  //     <NoOffer
  //       loanAmount={loanAmount}
  //       rejectReview={decision.reject_review}
  //       rejectReason={rejectReason}
  //       applicationStatus={applicationStatus}
  //       customerName={customerName}
  //       appid={appid}
  //     />
  //   );
  // }
  return (
    <Skelton loading={appDetails.loading}>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion defaultActiveKey="0" className="clix-accordion">
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="0">
                  <span className="icon">
                    <i className="clixicon-personal-info before" />
                  </span>
                  Offer Screen
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="progress-form">
                  <div className="progress-form-inn">
                    {!showPendingScreen && !showOffer && (
                      <div className="congratulation-container text-center">
                        <div className="gif-main">
                          <img src="../../images/no-offer.png" alt="no offer" />
                        </div>
                        <div className="cong-msg">
                          We regret to inform you that your Clix loan
                          application #
                          <span className="cong-title">
                            {'HFS'}
                            {appid}
                          </span>{' '}
                          could not be processed at this time. However, we
                          regularly review the rejected applications and we will
                          reach out to you, in case of revised approval on your
                          application. <br />
                          Please visit www.clix.capital to explore more options
                        </div>
                      </div>
                    )}
                    {showPendingScreen && (
                      <div className="congratulation-container text-center">
                        <div className="congratulation-inn">
                          <div className="gif-main">
                            <img src={waitingImg} alt="offer" />
                          </div>
                          {/* <div className="cong-title">
                            Congratulations {customerName}!
                          </div> */}
                          <div className="cong-msg">
                            The application is under processing.
                            {/* <i className="clixicon-rupee" />{' '} */}
                            {/* <span>{toLocaleString(loanAmount, true)}</span> */}
                          </div>
                          <div className="row phone-hide-blk">
                            <div className="col col-12 col-md-6">
                              <button
                                className="btn button btn-lg button-primary btn-block mt-4"
                                type="button"
                                onClick={() =>
                                  dispatch(loadApplicationDetails(appid))
                                }
                              >
                                Check Offer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showOffer && (
                      <div className="congratulation-container text-center">
                        <div className="congratulation-inn">
                          <div className="video-main">
                            <video
                              width="100%"
                              height="100%"
                              id="offer"
                              className="offer-video"
                              autoPlay
                              muted
                            >
                              <source src={offerMp4} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="cong-title">
                            Congratulations {customerName}!
                          </div>
                          <div className="cong-msg">
                            Your approved loan amount is{' '}
                            {/* <i className="clixicon-rupee" />{' '} */}
                            <span>{toLocaleString(loanAmount, true)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <NextAction
                      payload={{ uiStage: 'CREDIT_SUBMISSION' }}
                      show
                      // show={!showPendingScreen}
                    />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        {/* <ModalOtp /> */}
      </div>
    </Skelton>
  );
}

OfferCongratulation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  offerCongratulation: makeSelectOfferCongratulation(),
  appDetails: makeSelectApplicationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OfferCongratulation);
