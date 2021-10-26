/**
 *
 * DisbursalMoney
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import Skelton from 'components/Skelton';
import { Accordion, Card } from 'react-bootstrap';
import CustomToggle from 'components/CustomToggle';
import { UIStages } from '../App/constants';
import waitingImg from '../../images/waiting-loader-loop.gif';

function DisbursalMoney({ applicationPage }) {
  // const users = _.get(appDetails, 'appResponse.users', []);
  const { partner = '', product = '', appId = '' } = _.get(
    applicationPage,
    'appResponse',
    {},
  );
  const { uiStage } = _.get(applicationPage, 'leadResponse.details', {});

  const loanAgreementSignedUrl = '';
  const insuranceFormSignedUrl = '';

  return (
    <div className="d-flex justify-content-center">
      <div className="clix-container p-3">
        <Accordion defaultActiveKey="0" className="clix-accordion">
          <Card className="active">
            <Card.Header>
              <CustomToggle eventKey="0">
                <span className="icon">
                  <i className="clixicon-personal-info before" />
                </span>
                Completion Screen
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="progress-form">
                <div className="progress-form-inn">
                  <div className="clix-container p-3">
                    <div className="congratulation-container text-center">
                      <div className="congratulation-inn">
                        <div className="gif-main">
                          <img src={waitingImg} alt="offer" />
                        </div>
                        <div className="cong-msg cong-disbursal-msg" />
                        {/* {parseFloat(uiStage) === UIStages.APPLICATION_IN_CREDIT ? ( */}
                        {true ? (
                          <>
                            {' '}
                            <div className="cong-msg">
                              Your application #{''}
                              <span className="cong-title">
                                {partner}
                                {product}
                                {appId}
                              </span>{' '}
                              is pending KYC.
                              <br />
                              Once KYC is updated money transfer will be
                              initiated.
                              <br /> In case of any queries please write to
                              hello@clix.capital or chat with Maya.
                            </div>{' '}
                          </>
                        ) : (
                          <>
                            <div className="cong-msg">
                              Your application #{''}
                              <span className="cong-title">
                                {partner}
                                {product}
                                {appId}
                              </span>{' '}
                              is complete.
                              <br />
                              Money Transfer request to your account will be
                              initiated soon.
                              <br /> In case of any queries please write to
                              hello@clix.capital or chat with Maya.
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="col col-md-5 col-12"
                        style={{ margin: 'auto' }}
                      >
                        {insuranceFormSignedUrl ? (
                          <a
                            onClick={() => {
                              window.open(insuranceFormSignedUrl);
                              window.open(loanAgreementSignedUrl);
                            }}
                          >
                            <button className="btn button button-primary arrowBtn btn-block">
                              Submit
                            </button>
                          </a>
                        ) : (
                          <a
                            onClick={() => {
                              window.open(loanAgreementSignedUrl);
                            }}
                          >
                            <button className="btn button button-primary arrowBtn btn-block">
                              Submit
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  applicationPage: makeSelectApplicationPage(),
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
)(DisbursalMoney);
