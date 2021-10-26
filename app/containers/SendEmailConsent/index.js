/**
 *
 * SendEmailConsent
 *
 */
import _ from 'lodash';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSendEmailConsent from './selectors';
import reducer from './reducer';
import saga from './saga';

import { sendEmail } from './actions';

export function SendEmailConsent({
  emailId,
  appid,
  cuid,
  sendEmailConsent,
  dispatch,
}) {
  useInjectReducer({ key: 'sendEmailConsent', reducer });
  useInjectSaga({ key: 'sendEmailConsent', saga });

  const {
    emailSent = false,
    loading = false,
    error = false,
  } = sendEmailConsent;

  function getStatusText() {
    if (emailSent) {
      return `Email sent on ${emailId}`;
    }
    if (error) {
      return 'Failed to send email';
    }
    if (loading) {
      return 'Sending email...';
    }
    return 'Send confirmation email for user consent and verification.';
  }

  return (
    <div className="mt-4">
      <h5>Send Email Consent</h5>

      <div className="row mt-4">
        <div className="col col-sm-8 col-md-8">
          <p>{getStatusText()}</p>
          {/* TODO: Only for testing purpose */}
          {_.get(sendEmailConsent, 'error.link') ? (
            <a target="_verify" href={_.get(sendEmailConsent, 'error.link')}>
              Verify Email
            </a>
          ) : null}
        </div>
        <div className="col col-sm-4 col-md-4">
          <button
            type="button"
            className="btn button btn-lg button-primary btn-block"
            onClick={e => {
              e.preventDefault();
              dispatch(sendEmail({ emailId, appid, cuid }));
            }}
          >
            {emailSent ? 'Resend Email' : ' Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
}

SendEmailConsent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  emailId: PropTypes.string.isRequired,
  appid: PropTypes.string.isRequired,
  cuid: PropTypes.string.isRequired,
  sendEmailConsent: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  sendEmailConsent: makeSelectSendEmailConsent(),
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
)(SendEmailConsent);
