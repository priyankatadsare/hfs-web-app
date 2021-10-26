/**
 *
 * LoanDetail
 *
 */

import React, { useState, useEffect } from 'react';
import {
  Accordion,
  useAccordionToggle,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { toLocaleString, formatDate } from 'utils/helpers';
import LoanType from 'components/LoanType';
import { Link } from 'react-router-dom';
import moment from 'moment';
import KnockoutRuleModal from '../KnockoutRuleModal';

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">*Please Note</Popover.Title>
    <Popover.Content>
      Restructuring of loan account is subjective and at the sole discretion of
      Clix Capital Services Pvt. Ltd.
    </Popover.Content>
  </Popover>
);

function LoanDetail({
  loan,
  createRLAApplication,
  masterData,
  createLead,
  fetchLanDetails,
  loanApplications,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setCollapsed(!collapsed),
    );
    return (
      <div
        className="app-detailBlk adBtnBlk"
        eventKey="0"
        onClick={decoratedOnClick}
      >
        {children}
      </div>
    );
  };

  const CustomToggle2 = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setCollapsed(!collapsed),
    );
    return (
      <a
        data-toggle="collapse"
        role="button"
        eventKey="0"
        aria-expanded="false"
        aria-controls="collapse"
        onClick={decoratedOnClick}
        className={`btn viewLoanBtn ${collapsed ? 'collapsed' : ''}`}
      />
    );
  };
  console.log('collapsed', collapsed);
  const {
    loanAmount,
    tenure,
    emi,
    customerUnique_ID,
    loanAccountNumber,
    interestRate,
    totalLoanAmount,
    loanAmountDue,
    emi_Cycle,
    emi_DueDate,
    loan_start_date,
    nextPaymentDueDate,
    amountPayable,
    lastPaymentMade,
    loanType,
    appid,
    partner,
    product,
    lmsSystem,
  } = loan;

  console.log(
    'loan_start_date',
    formatDate(loan_start_date, 'YYYY-MM-DD', 'Do MMM'),
  );

  const [knockoutModalShow, setKnockoutModalShow] = useState(false);
  let rejectReason = '';

  /**
   * @description Function to check knockout rule and show popup if RLA not allowed
   */
  function checkKnockoutRule() {
    if (false) {
      rejectReason = 'Disbursed after 29 Feb 2020';
      return false;
    } else {
      //Check value from Master API now to check other 2 rules---
      if (masterData && masterData.length > 0) {
        let currentMasterData = masterData.filter(
          item => item.cmCode === loanAccountNumber,
        );
        rejectReason =
          (currentMasterData[0] || {}).cmValue || 'masterData NEGETIVELIST_RLA';
        return false;
      } else {
        return true;
      }
    }
  }

  // function checkDate() {
  //   var varDate = new Date('31-12-2020'); //31-12-2020
  //   var today = new Date();
  //   if (today > varDate) {
  //     return false;
  //   }
  //   return true;
  // }

  function checkProduct() {
    if (product === 'BL' || product === 'LAEP') return true;
    return false;
  }

  useEffect(() => {
    if (loanApplications.lanDetails.hasOwnProperty(loanAccountNumber)) {
      let currentLanDetail = loanApplications.lanDetails[loanAccountNumber];
      const maxDateAllowed = moment('29/02/2020', 'DD/MM/YYYY').format(
        'DD/MM/YYYY',
      );
      const { disbursed_date } = loanApplications.lanDetails[loanAccountNumber];
      const loanStartDate = moment(disbursed_date, [
        'DD/MM/YYYY',
        'DD-MM-YYYY',
      ]).format('DD/MM/YYYY');

      var momentA = moment(loanStartDate, 'DD/MM/YYYY');
      var momentB = moment(maxDateAllowed, 'DD/MM/YYYY');

      if (momentA > momentB) {
        rejectReason = 'Disbursed after 29 Feb 2020';
        let mobile = JSON.parse(window.sessionStorage.getItem('mobile')) || '';
        let emailId = JSON.parse(window.sessionStorage.getItem('email')) || '';
        let leadData = {
          mobile,
          emailId,
          data: {
            optionalId: loanAccountNumber,
            rejectReason,
          },
          sourcePartner: 'RLA',
          uiStage: '-1',
          optionalId: loanAccountNumber,
        };
        createLead(leadData);
        setKnockoutModalShow(true);
        return;
      }

      const { dpd_days } = currentLanDetail;
      //if (dpd_days >= 90) {
      if (false) {
        //Reject Application
        let mobile = JSON.parse(window.sessionStorage.getItem('mobile')) || '';
        let emailId = JSON.parse(window.sessionStorage.getItem('email')) || '';
        let leadData = {
          mobile,
          emailId,
          data: {
            optionalId: loanAccountNumber,
            rejectReason: 'DPD Days greater than 90',
          },
          sourcePartner: 'RLA',
          uiStage: '-1',
          optionalId: loanAccountNumber,
        };
        createLead(leadData);
        setKnockoutModalShow(true);
      } else {
        //Create Lead and Create Application will be called here
        let payload = {
          appid,
          cuid: customerUnique_ID,
          partner,
          product,
          lan: loanAccountNumber,
          lmsSystem,
        };
        createRLAApplication(payload);
      }
    }
  }, [loanApplications.lanDetails]);

  function handleRlaClick() {
    //Check KnockoutRule first , if loan passes all rules proceed else show modal
    let knockoutRulePassed = checkKnockoutRule();
    if (knockoutRulePassed) {
      //fetch lan details and check DPD > 90 or not and reject if >= 90 days
      fetchLanDetails({
        lan: loanAccountNumber,
        lmsSystem,
      });
      // //Create Lead and Create Application will be called here
      // let payload = {
      //   appid,
      //   cuid: customerUnique_ID,
      //   partner,
      //   product,
      //   lan: loanAccountNumber,
      //   lmsSystem,
      // };
      // createRLAApplication(payload);
    } else {
      //Show Modal and create lead to monitor cases with knockout rule cases in Sales/credit Portal
      let mobile = JSON.parse(window.sessionStorage.getItem('mobile')) || '';
      let emailId = JSON.parse(window.sessionStorage.getItem('email')) || '';
      let leadData = {
        mobile,
        emailId,
        data: {
          optionalId: loanAccountNumber,
          rejectReason,
        },
        sourcePartner: 'RLA',
        uiStage: '-1',
        optionalId: loanAccountNumber,
      };
      createLead(leadData);
      setKnockoutModalShow(true);
    }
  }
  return (
    <Accordion className="am-contBlk loanBlk">
      <div className="app-detail">
        <LoanType loanType={loanType}>
          <CustomToggle2 eventKey="0" />
        </LoanType>
        <div className="app-detailBlk">
          <span>Loan Amount</span>
          <i className="clixicon-rupee" /> {toLocaleString(loanAmount)}
        </div>

        <div className="app-detailBlk">
          <span>Tenure</span>
          {`${tenure} months`}
        </div>

        <div className="app-detailBlk">
          <span>EMI</span>
          <i className="clixicon-rupee" />
          {toLocaleString(emi)}
        </div>

        <div className="app-detailBlk">
          <span>EMI Due Date</span>
          {formatDate(emi_DueDate, 'DD-MM-YYYY')}
        </div>

        <CustomToggle eventKey="0">
          <a
            data-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapse"
            className={`btn button button-customSmall ${
              collapsed ? 'collapsed' : ''
            } viewLoanBtn`}
          >
            View Details
          </a>
        </CustomToggle>
      </div>
      <div className="app-detail">
        {/* {checkProduct() ? ( */}
        <>
          <div
            className="col col-12 col-md-12 flex-row am-blocks am-block am-contBlk app-prev"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '1rem',
              paddingTop: '1px',
            }}
          >
            <Link
              to="#"
              className="btn button button-primary button-customSmall arrowBtn"
              onClick={handleRlaClick}
              style={{ marginTop: '0' }}
            >
              Apply For Loan Restructure
            </Link>
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={popover}
              rootClose={true}
            >
              <span class="amountInfo" style={{ padding: '5px' }}>
                <img src="/icon_i.png" />
              </span>
            </OverlayTrigger>
          </div>
          <KnockoutRuleModal
            show={knockoutModalShow}
            onHide={() => setKnockoutModalShow(false)}
          />
        </>
        {/* ) : (
          <> </>
        )} */}
      </div>
      <Accordion.Collapse eventKey="0">
        <div className="collapseCard">
          <div className="row">
            {/* {checkDate() ? (
              <div
                className="col col-12 col-md-12 flex-row"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                  paddingTop: '1px',
                }}
              >
                <Link
                  to="#"
                  className="btn button button-primary button-customSmall arrowBtn"
                  onClick={handleRlaClick}
                >
                  Apply For Loan Restructure
                </Link>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <span class="amountInfo" style={{ padding: '5px' }}>
                    <img src="/icon_i.png" />
                  </span>
                </OverlayTrigger>
              </div>
            ) : (
              <> </>
            )} */}

            <div className="col col-12 col-md-7">
              <div className="cardBlk">
                {/* <a href="" className="absoluteBtn blueTag">
                  <i className="clixicon-kyc" /> Update KYC Details
                </a> */}
                <div className="cTitle">Loan Details</div>

                <div className="card-details">
                  <div className="card-detail">
                    <div className="left">Customer Unique ID</div>
                    <div className="right">{customerUnique_ID}</div>
                  </div>

                  <div className="card-detail">
                    <div className="left">Loan Account Number</div>
                    <div className="right">{loanAccountNumber}</div>
                  </div>

                  <div className="card-detail">
                    <div className="left">
                      Interest Rate{' '}
                      {/* <a href="" className="blueTag">
                        <i className="clixicon-down-arrow" />
                        Interest Certificate
                      </a> */}
                    </div>
                    <div className="right">{`${interestRate}%`}</div>
                  </div>

                  <div className="card-detail">
                    <div className="left" />
                    <div className="right">{`${formatDate(
                      emi_DueDate,
                      'DD-MM-YYYY',
                      'Do',
                    )} of every ${{ Monthly: 'month' }[emi_Cycle] ||
                      'month'}`}</div>
                  </div>

                  <div className="card-detail row">
                    <div className="col col-12 col-md-6" />
                    {/* <div className="col col-12 col-md-6">
                      <a href="" className="btn button button-secondary">
                        Download Loan Agreement
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-5">
              <div className="cardBlk">
                <div className="cTitle">Repayment Details</div>

                <div className="card-details">
                  <div className="card-detail">
                    <div className="left">Total Loan Amount</div>
                    <div className="right">
                      <i className="clixicon-rupee" />
                      {toLocaleString(totalLoanAmount)}
                    </div>
                  </div>

                  <div className="card-detail">
                    <div className="left">Total Amount Due</div>
                    <div className="right">
                      <i className="clixicon-rupee" />
                      {toLocaleString(loanAmountDue)}
                    </div>
                  </div>

                  {/* <div className="card-detail">
                    <div className="left">Last Payment Made</div>
                    <div className="right">{formatDate(lastPaymentMade)}</div>
                  </div> */}

                  <div className="card-detail">
                    <div className="left">Next Payment Due Date</div>
                    <div className="right">
                      {formatDate(nextPaymentDueDate, 'DD-MM-YYYY')}
                    </div>
                  </div>

                  <OverlayTrigger
                    rootClose={true}
                    target="amountPay"
                    trigger="click"
                    key={'top'}
                    placement="top"
                    overlay={
                      // <Tooltip id={`tooltip-${'placement'}`}>
                      //   Tooltip on <strong>{'placement'}</strong>.
                      // </Tooltip>
                      <Popover className="collapseCard">
                        <div
                          className="cardBlk amountCard"
                          style={{ width: '250px' }}
                        >
                          <div className="cTitle">
                            Amount Payble
                            <button
                              type="button"
                              className="close"
                              aria-label="Close"
                            >
                              {/* <span aria-hidden="true">
                                <i className="clixicon-close" />
                              </span> */}
                            </button>
                          </div>
                          <div className="card-details">
                            <div className="card-detail">
                              <div className="left">EMI Amount</div>
                              <div className="right">
                                <i className="clixicon-rupee" />
                                {toLocaleString(emi)}
                              </div>
                            </div>
                            <div className="card-detail">
                              <div className="left">Late Payment Charges</div>
                              <div className="right">
                                Exclusive of late payment charges and applicable
                                GST
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    }
                  >
                    <div className="amountPay">
                      <div>
                        <strong>Amount Payable</strong>
                      </div>

                      <div className="price">
                        <i className="clixicon-rupee" />{' '}
                        {`${toLocaleString(amountPayable)} `}
                        <span className="amountInfo">
                          <img src="/icon_i.png" />
                        </span>
                      </div>
                    </div>
                  </OverlayTrigger>

                  {/* <div className="card-detail">
                    <a
                      href=""
                      className="btn button btn-lg button-primary btn-block arrowBtn"
                    >
                      Proceed to Payment
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
}

LoanDetail.propTypes = {};

export default LoanDetail;
