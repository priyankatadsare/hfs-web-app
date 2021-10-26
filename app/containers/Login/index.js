/**
 *
 * Login
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import InputField from '../../components/InputField';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { SecureSvg, PrivacySvg } from 'components/SVG';
import { MOBILE_PATTERN, EMAIL_PATTERN_2 } from '../App/constants';
import { useForm } from 'react-hook-form';
import { loginUser } from './actions';

export function Login({ login, loginUser }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    loginUser(data);
  };
  const values = watch();
  const [btnCollapse, setBtnCollapse] = useState(false);

  function CustomToggle({ children, eventKey }) {
    console.log('eventKey', eventKey);
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
      setBtnCollapse(btnCollapse);
    });

    return (
      <h5 className="mb-0">
        <button
          className={`btn btn-link ${!btnCollapse ? '' : 'collapsed'}`}
          // onClick={decoratedOnClick}
        >
          <span className="icon">
            <i className="clixicon-personal-info before" />
          </span>{' '}
          Please Enter Your Details
        </button>
      </h5>
    );
  }

  return (
    <div className="col col-12">
      <div className="row">
        <div className="col col-12">
          <div className="heading-blk d-flex justify-content-between">
            <h1 className="main-heading">Account Login</h1>
            <div className="small-link d-flex justify-content-center align-items-center">
              <a href="https://www.clix.capital/our-policies/">
                <span className="icon">
                  <SecureSvg />
                </span>
                Safe & Secure
              </a>
              <a href="https://www.clix.capital/privacy-policy/">
                <span className="icon">
                  <PrivacySvg />
                </span>
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="clix-container p-3">
          <Accordion defaultActiveKey="0" className="clix-accordion">
            <Card className="active">
              <Card.Header>
                <CustomToggle eventKey="0" />
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="progress-form">
                  <div className="progress-form-inn">
                    <form
                      className="clix-form cutomerVerifyForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <VerticalProgressBar values={values} errors={errors} />
                      <div className={`customer-verify-blk ${'active'}`}>
                        <div className="form-heading mb-3">
                          Please Provide Your registered Email ID / Mobile
                          Number
                        </div>

                        <div className="row">
                          <div className="col col-12 col-md-8">
                            <InputField
                              className="form-control"
                              id="mobile"
                              name="userName"
                              register={register({
                                required: true,
                                validate: {
                                  mobile: value => {
                                    return MOBILE_PATTERN.test(value) ||
                                      EMAIL_PATTERN_2.test(value)
                                      ? true
                                      : 'Please enter correct Mobile/Email';
                                  },
                                },
                                maxLength: {
                                  value: 100,
                                  message: 'Max length 100 chracters allowed',
                                },
                              })}
                              type="text"
                              errors={errors}
                              placeholder="Email ID / Mobile Number"
                              labelHtml={
                                <label htmlFor="mobile">
                                  Enter registered Email ID / Mobile Number
                                </label>
                              }
                            />
                            <InputField
                              className="form-control"
                              id="password"
                              name="password"
                              register={register({
                                required: true,
                                maxLength: {
                                  value: 10,
                                  message: 'Max length 10 chracters allowed',
                                },
                              })}
                              type="password"
                              errors={errors}
                              placeholder="Enter Password"
                              labelHtml={
                                <label htmlFor="password">Password</label>
                              }
                            />
                          </div>
                        </div>

                        <div className="row phone-hide-blk">
                          <div className="col col-12 col-md-6">
                            <button
                              className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        {/* <ModalOtp /> */}
      </div>
    </div>
  );
}

Login.propTypes = {};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginUser: data => {
      dispatch(loginUser(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
