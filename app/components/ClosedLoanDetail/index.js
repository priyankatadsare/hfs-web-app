/**
 *
 * ClosedLoanDetail
 *
 */

import React, { useState } from 'react';
import {
  Accordion,
  useAccordionToggle,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { toLocaleString, formatDate } from 'utils/helpers';
import LoanType from 'components/LoanType';

function ClosedLoanDetail({ loan }) {
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
  } = loan;

  console.log(
    'loan_start_date',
    formatDate(loan_start_date, 'YYYY-MM-DD', 'Do MMM'),
  );
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

      <Accordion.Collapse eventKey="0">
        <div className="collapseCard">
          <div className="row">
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

                  {/* <div className="card-detail">
                    <div className="left">Loan Closure Date</div> */}
                  {/* <div className="right">{`${formatDate(
                      emi_DueDate,
                      '',
                      'Do',
                    )} of every ${{ Monthly: 'month' }[emi_Cycle] ||
                      'month'}`}</div> */}
                  {/* </div> */}

                  <div className="card-detail row">
                    {/* <div className="col col-12 col-md-6">
                    <a href="" className="btn button button-secondary">
                      Download NOC
                    </a>
                    </div> */}

                    <div className="col col-12 col-md-6">
                    </div>
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
                      {new Intl.NumberFormat('en-IN', {
                        maximumFractionDigits: 0,
                      }).format(totalLoanAmount)}
                      {/* {toLocaleString(totalLoanAmount)} */}
                    </div>
                  </div>

                  {/* <div className="card-detail">
                    <div className="left">Last Payment Made</div>
                    <div className="right">{formatDate(lastPaymentMade)}</div>
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

ClosedLoanDetail.propTypes = {};

export default ClosedLoanDetail;
