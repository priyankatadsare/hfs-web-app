/**
 *
 * ApplicationReview
 *
 */
import _ from 'lodash';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import NextAction from 'containers/NextAction/Loadable';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import Skelton from 'components/Skelton';
import CustomToggle from 'components/CustomToggle';
import { Accordion, Card } from 'react-bootstrap';
import ApplicantDetail from './ApplicantDetail';
import LoanDetails from './LoanDetails';
import BankDetail from './BankDetails';

function ApplicationReview({ applicationPage }) {
  const { loading, error } = applicationPage;

  // D2CP2-1123: Earlier the GUARANTOR had type = 'GUARANTOR' but now on type == 'INDIVIDUAL' and  appLMS: { role: 'GUARANTOR' }
  const gurantors = _.filter(
    _.get(applicationPage, 'appResponse.users', {}),
    user => _.get(user, 'appLMS.role') !== 'Applicant',
  );

  const mainApplicant = _.find(
    _.get(applicationPage, 'appResponse.users', {}),
    {
      appLMS: { role: 'Applicant' },
    },
  );
  console.log('mainApplicant', mainApplicant);
  const { uiStage } = _.get(applicationPage, 'leadResponse.details', {});

  const { bankDetail = {}, loanOffers = [], appCollaterals = [] } = _.get(
    applicationPage,
    'appResponse',
    {},
  );
  return (
    <Skelton loading={loading} error={error}>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion
            defaultActiveKey="PREVIEW_APPLICATION"
            className="clix-accordion"
          >
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="PREVIEW_APPLICATION">
                  <span className="icon">
                    <i className="clixicon-personal-info before" />
                  </span>
                  Application Preview
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="PREVIEW_APPLICATION">
                <Card.Body className="progress-form clix-form disbursal-bank-detail">
                  <div className="progress-form-inn">
                    <>
                      <ApplicantDetail
                        formRef={null}
                        kind="Applicant"
                        index=""
                        applicant={mainApplicant || { userIdentities: {} }}
                      />
                      <hr className="mt-4 mb-4" />
                    </>
                    {/* <div className="row">{createAddressList()}</div> */}
                    {/* ----------New Application form starts below---------- */}
                    {gurantors.map((gurantor, index) => (
                      <>
                        <ApplicantDetail
                          formRef={null}
                          kind="Guarantor"
                          index={index + 1}
                          applicant={gurantor}
                        />
                        <hr className="mt-4 mb-4" />
                      </>
                    ))}
                    <LoanDetails
                      appCollaterals={appCollaterals}
                      loanOffers={loanOffers}
                    />
                    {/* <hr className="mt-4 mb-4" />
                    <BankDetail bankDetail={bankDetail} /> */}
                  </div>
                  {/* <CustomToggle eventKey={uiStage}> */}
                  <NextAction
                    payload={{ uiStage: 'PREVIEW_APPLICATION' }}
                    show
                  />
                  {/* </CustomToggle> */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </Skelton>
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

ApplicationReview.propTypes = {};

export default compose(
  withConnect,
  memo,
)(ApplicationReview);
