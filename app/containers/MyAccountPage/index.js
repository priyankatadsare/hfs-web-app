/**
 *
 * MyAccountPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMyAccountPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function MyAccountPage() {
  useInjectReducer({ key: 'myAccountPage', reducer });
  useInjectSaga({ key: 'myAccountPage', saga });

  return (
    <>
      <Helmet>
        <title>MyAccountPage</title>
        <meta name="description" content="Description of MyAccountPage" />
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
                  href=""
                  className="btn button button-customSmall btn-linePrimary"
                >
                  Apply for new loan
                </a>
              </div>

              <div className="sub-heading">Running Application</div>

              <div className="am-contBlk app-prev">
                <div>
                  <div className="title">
                    Loan Application
                    <span className="tag">Incomplete</span>
                  </div>

                  <p>Complete your application in few minutes to get a loan</p>

                  <div className="app-detail d-flex">
                    <div className="app-detailBlk">
                      <span>Application Start Date</span>
                      2nd April
                    </div>

                    <div className="app-detailBlk">
                      <span>Laon Reference Id</span>
                      23546846484878ACB
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href=""
                    className="btn button button-primary button-customSmall"
                  >
                    Complete Now
                  </a>
                </div>
              </div>

              <div className="am-contBlk loanBlk">
                <div className="app-detail justify-content-start">
                  <div className="app-detailBlk ltitle">
                    <i className="clixicon-education" />
                    Education
                    <a
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      className="btn collapsed viewLoanBtn"
                    />
                  </div>
                  <div className="app-detailBlk">
                    <span>Application Start Date</span>
                    20th March
                  </div>

                  <div className="app-detailBlk">
                    <span>Status</span>
                    <div style={{ color: '#c4aa37' }}>In Progress</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="am-block">
              <div className="headingBlk d-flex justify-content-between">
                <h2 className="icon-heading">
                  <i className="clixicon-getOffer" /> My Loans
                </h2>
              </div>

              <div className="maTabs">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="runningLoans-tab"
                      data-toggle="tab"
                      href="#runningLoans"
                      role="tab"
                      aria-controls="runningLoans"
                      aria-selected="true"
                    >
                      Running Loans
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="closedLoans-tab"
                      data-toggle="tab"
                      href="#closedLoans"
                      role="tab"
                      aria-controls="closedLoans"
                      aria-selected="false"
                    >
                      Closed Loans
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="runningLoans"
                    role="tabpanel"
                    aria-labelledby="runningLoans-tab"
                  >
                    <div className="am-contBlks ">
                      <div className="am-contBlk loanBlk">
                        <div className="app-detail">
                          <div className="app-detailBlk ltitle">
                            <i className="clixicon-education" />
                            Education
                            <a
                              data-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                              className="btn collapsed viewLoanBtn"
                            />
                          </div>
                          <div className="app-detailBlk">
                            <span>Loan Amount</span>
                            <i className="clixicon-rupee" /> 6,00,000
                          </div>

                          <div className="app-detailBlk">
                            <span>Tenure</span>
                            10 months
                          </div>

                          <div className="app-detailBlk">
                            <span>EMI</span>
                            <i className="clixicon-rupee" /> 30,269
                          </div>

                          <div className="app-detailBlk">
                            <span>EMI Due Date</span>
                            27th March
                          </div>

                          <div className="app-detailBlk adBtnBlk">
                            <a
                              data-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                              className="btn button button-customSmall collapsed viewLoanBtn"
                            >
                              View Details
                            </a>
                          </div>
                        </div>

                        <div className="collapse" id="collapseExample">
                          <div className="collapseCard">
                            <div className="row">
                              <div className="col col-12 col-md-7">
                                <div className="cardBlk">
                                  <a href="" className="absoluteBtn blueTag">
                                    <i className="clixicon-kyc" /> Update KYC
                                    Details
                                  </a>
                                  <div className="cTitle">Loan Details</div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Customer Unique ID
                                      </div>
                                      <div className="right">09223847382</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Account Number
                                      </div>
                                      <div className="right">248127819024</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Interest Rate{' '}
                                        <a href="" className="blueTag">
                                          <i className="clixicon-down-arrow" />
                                          Interest Certificate
                                        </a>
                                      </div>
                                      <div className="right">20%</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        EMI Cycle{' '}
                                        <a href="" className="blueTag">
                                          <i className="clixicon-down-arrow" />{' '}
                                          EMI Schedule
                                        </a>
                                      </div>
                                      <div className="right">
                                        27th of every month
                                      </div>
                                    </div>

                                    <div className="card-detail row">
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Account Statement
                                        </a>
                                      </div>
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Loan Agreement
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col col-12 col-md-5">
                                <div className="cardBlk">
                                  <div className="cTitle">
                                    Repayment Details
                                  </div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Total Loan Amount
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        6,00,000
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Amount Due
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        4,78,340
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Last Payment Made
                                      </div>
                                      <div className="right">27th Feb</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Next Payment Due Date
                                      </div>
                                      <div className="right">27th March</div>
                                    </div>

                                    <div className="amountPay">
                                      <div>
                                        <strong>Amount Payable</strong>
                                      </div>

                                      <div className="price">
                                        <i className="clixicon-rupee" /> 32,650{' '}
                                        <span className="amountInfo">
                                          <img src="images/icon_i.png" />
                                        </span>
                                      </div>

                                      <div className="cardBlk amountCard">
                                        <div className="cTitle">
                                          Amount Payble
                                          <button
                                            type="button"
                                            className="close"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              <i className="clixicon-close" />
                                            </span>
                                          </button>
                                        </div>

                                        <div className="card-details">
                                          <div className="card-detail">
                                            <div className="left">
                                              EMI Amount
                                            </div>
                                            <div className="right">
                                              <i className="clixicon-rupee" />
                                              30,269
                                            </div>
                                          </div>

                                          <div className="card-detail">
                                            <div className="left">
                                              Late Payment Charges
                                            </div>
                                            <div className="right">
                                              {' '}
                                              2% + GST
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <a
                                        href=""
                                        className="btn button btn-lg button-primary btn-block arrowBtn"
                                      >
                                        Proceed to Payment
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="am-contBlk loanBlk">
                        <div className="app-detail">
                          <div className="app-detailBlk ltitle">
                            <i className="clixicon-home" />
                            Home Loan
                            <a
                              data-toggle="collapse"
                              href="#collapseExample1"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample1"
                              className="btn collapsed viewLoanBtn"
                            />
                          </div>
                          <div className="app-detailBlk">
                            <span>Loan Amount</span>
                            <i className="clixicon-rupee" /> 6,00,000
                          </div>

                          <div className="app-detailBlk">
                            <span>Tenure</span>
                            10 months
                          </div>

                          <div className="app-detailBlk">
                            <span>EMI</span>
                            <i className="clixicon-rupee" /> 30,269
                          </div>

                          <div className="app-detailBlk">
                            <span>EMI Due Date</span>
                            27th March
                          </div>

                          <div className="app-detailBlk adBtnBlk">
                            <a
                              data-toggle="collapse"
                              href="#collapseExample1"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample1"
                              className="btn button button-customSmall collapsed viewLoanBtn"
                            >
                              View Details
                            </a>
                          </div>
                        </div>

                        <div className="collapse" id="collapseExample1">
                          <div className="collapseCard">
                            <div className="row">
                              <div className="col col-12 col-md-7">
                                <div className="cardBlk">
                                  <a href="" className="absoluteBtn blueTag">
                                    <i className="clixicon-kyc" /> Update KYC
                                    Details
                                  </a>
                                  <div className="cTitle">Loan Details</div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Customer Unique ID
                                      </div>
                                      <div className="right">09223847382</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Account Number
                                      </div>
                                      <div className="right">248127819024</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Interest Rate{' '}
                                        <a href="" className="blueTag">
                                          <i className="clixicon-down-arrow" />
                                          Interest Certificate
                                        </a>
                                      </div>
                                      <div className="right">20%</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        EMI Cycle{' '}
                                        <a href="" className="blueTag">
                                          <i className="clixicon-down-arrow" />{' '}
                                          EMI Schedule
                                        </a>
                                      </div>
                                      <div className="right">
                                        27th of every month
                                      </div>
                                    </div>

                                    <div className="card-detail row">
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Account Statement
                                        </a>
                                      </div>
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Loan Agreement
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col col-12 col-md-5">
                                <div className="cardBlk">
                                  <div className="cTitle">
                                    Repayment Details
                                  </div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Total Loan Amount
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        6,00,000
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Amount Due
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        4,78,340
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Last Payment Made
                                      </div>
                                      <div className="right">27th Feb</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Next Payment Due Date
                                      </div>
                                      <div className="right">27th March</div>
                                    </div>

                                    <div className="amountPay">
                                      <div>
                                        <strong>Amount Payable</strong>
                                      </div>

                                      <div className="price">
                                        <i className="clixicon-rupee" /> 32,650{' '}
                                        <span className="amountInfo">
                                          <img src="images/icon_i.png" />
                                        </span>
                                      </div>

                                      <div className="cardBlk amountCard">
                                        <div className="cTitle">
                                          Amount Payble
                                          <button
                                            type="button"
                                            className="close"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">
                                              <i className="clixicon-close" />
                                            </span>
                                          </button>
                                        </div>

                                        <div className="card-details">
                                          <div className="card-detail">
                                            <div className="left">
                                              EMI Amount
                                            </div>
                                            <div className="right">
                                              <i className="clixicon-rupee" />
                                              30,269
                                            </div>
                                          </div>

                                          <div className="card-detail">
                                            <div className="left">
                                              Late Payment Charges
                                            </div>
                                            <div className="right">
                                              {' '}
                                              2% + GST
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <a
                                        href=""
                                        className="btn button btn-lg button-primary btn-block arrowBtn"
                                      >
                                        Proceed to Payment
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="closedLoans"
                    role="tabpanel"
                    aria-labelledby="closedLoans-tab"
                  >
                    <div className="am-contBlks ">
                      <div className="am-contBlk loanBlk">
                        <div className="app-detail">
                          <div className="app-detailBlk ltitle">
                            <i className="clixicon-education" />
                            Education
                            <a
                              data-toggle="collapse"
                              href="#collapseExample2"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample2"
                              className="btn collapsed viewLoanBtn"
                            />
                          </div>
                          <div className="app-detailBlk">
                            <span>Loan Amount</span>
                            <i className="clixicon-rupee" /> 6,00,000
                          </div>

                          <div className="app-detailBlk">
                            <span>Tenure</span>
                            10 months
                          </div>

                          <div className="app-detailBlk adBtnBlk">
                            <a
                              data-toggle="collapse"
                              href="#collapseExample2"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample2"
                              className="btn button button-customSmall collapsed viewLoanBtn"
                            >
                              View Details
                            </a>
                          </div>
                        </div>

                        <div className="collapse" id="collapseExample2">
                          <div className="collapseCard">
                            <div className="row">
                              <div className="col col-12 col-md-7">
                                <div className="cardBlk">
                                  <a href="" className="absoluteBtn blueTag">
                                    <i className="clixicon-kyc" /> Update KYC
                                    Details
                                  </a>
                                  <div className="cTitle">Loan Details</div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Customer Unique ID
                                      </div>
                                      <div className="right">09223847382</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Account Number
                                      </div>
                                      <div className="right">248127819024</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Closure Date
                                      </div>
                                      <div className="right">
                                        27th of every month
                                      </div>
                                    </div>
                                    <div className="card-detail row">
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download NOC{' '}
                                        </a>
                                      </div>
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Loan Agreement
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col col-12 col-md-5">
                                <div className="cardBlk">
                                  <div className="cTitle">
                                    Repayment Details
                                  </div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Total Loan Amount
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        6,00,000
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Last Payment Made
                                      </div>
                                      <div className="right">27th Feb</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="am-contBlk loanBlk">
                        <div className="app-detail">
                          <div className="app-detailBlk ltitle">
                            <i className="clixicon-home" />
                            Home Loan
                            <a
                              data-toggle="collapse"
                              href="#collapseExample3"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample3"
                              className="btn collapsed viewLoanBtn"
                            />
                          </div>
                          <div className="app-detailBlk">
                            <span>Loan Amount</span>
                            <i className="clixicon-rupee" /> 6,00,000
                          </div>

                          <div className="app-detailBlk">
                            <span>Tenure</span>
                            10 months
                          </div>

                          <div className="app-detailBlk adBtnBlk">
                            <a
                              data-toggle="collapse"
                              href="#collapseExample3"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample3"
                              className="btn button button-customSmall collapsed viewLoanBtn"
                            >
                              View Details
                            </a>
                          </div>
                        </div>

                        <div className="collapse" id="collapseExample3">
                          <div className="collapseCard">
                            <div className="row">
                              <div className="col col-12 col-md-7">
                                <div className="cardBlk">
                                  <a href="" className="absoluteBtn blueTag">
                                    <i className="clixicon-kyc" /> Update KYC
                                    Details
                                  </a>
                                  <div className="cTitle">Loan Details</div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Customer Unique ID
                                      </div>
                                      <div className="right">09223847382</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Account Number
                                      </div>
                                      <div className="right">248127819024</div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Loan Closure Date
                                      </div>
                                      <div className="right">
                                        27th of every month
                                      </div>
                                    </div>

                                    <div className="card-detail row">
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download NOC{' '}
                                        </a>
                                      </div>
                                      <div className="col col-12 col-md-6">
                                        <a
                                          href=""
                                          className="btn button button-secondary"
                                        >
                                          Download Loan Agreement
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col col-12 col-md-5">
                                <div className="cardBlk">
                                  <div className="cTitle">
                                    Repayment Details
                                  </div>

                                  <div className="card-details">
                                    <div className="card-detail">
                                      <div className="left">
                                        Total Loan Amount
                                      </div>
                                      <div className="right">
                                        <i className="clixicon-rupee" />{' '}
                                        6,00,000
                                      </div>
                                    </div>

                                    <div className="card-detail">
                                      <div className="left">
                                        Last Payment Made
                                      </div>
                                      <div className="right">27th Feb</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-lg-3">
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
                      <i className="clixicon-rupee" /> 6,00,000
                    </strong>
                  </div>

                  <div className="flexRow">
                    <span>Tenure</span>
                    <strong>10 months</strong>
                  </div>

                  <div className="flexRow">
                    <span>EMI</span>
                    <strong>
                      <i className="clixicon-rupee" /> 30,269
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
        </div>
      </div>
    </>
  );
}

MyAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myAccountPage: makeSelectMyAccountPage(),
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

export default compose(withConnect)(MyAccountPage);
