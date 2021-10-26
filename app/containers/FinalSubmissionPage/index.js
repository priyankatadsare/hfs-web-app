/**
 *
 * FinalSubmissionPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import Skelton from 'components/Skelton';
import { Accordion, Card } from 'react-bootstrap';
import CustomToggle from 'components/CustomToggle';
import saga from './saga';
import reducer from './reducer';
import makeSelectFinalSubmissionPage from './selectors';
import waitingImg from '../../images/waiting-loader-loop.gif';
import { setSuccessFalse, setUserDecision } from './actions';
import { useHistory } from 'react-router-dom';

export function FinalSubmissionPage({
  applicationPage,
  dispatch,
  finalSubmissionPage,
}) {
  useInjectReducer({ key: 'finalSubmissionPage', reducer });
  useInjectSaga({ key: 'finalSubmissionPage', saga });

  const history = useHistory();

  // const users = _.get(appDetails, 'appResponse.users', []);
  const { partner = '', product = '', appId = '' } = _.get(
    applicationPage,
    'appResponse',
    {},
  );

  const { success = false } = finalSubmissionPage;

  useEffect(() => {
    dispatch(setSuccessFalse());
  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.replace(`/dashboard/open`);
      }, 1000);
    }
  }, [success]);
  // const { uiStage } = _.get(applicationPage, 'leadResponse.details', {});

  // const loanAgreementSignedUrl = '';
  // const insuranceFormSignedUrl = '';

  return (
    <Skelton loading={applicationPage.loading}>
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
                        </div>
                        <div
                          className="col col-md-5 col-12"
                          style={{ margin: 'auto' }}
                        >
                          <button
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              dispatch(setUserDecision());
                            }}
                            className="btn button button-primary arrowBtn btn-block"
                          >
                            Submit
                          </button>
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
    </Skelton>
  );
}

FinalSubmissionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  applicationPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  finalSubmissionPage: makeSelectFinalSubmissionPage(),
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
)(FinalSubmissionPage);
