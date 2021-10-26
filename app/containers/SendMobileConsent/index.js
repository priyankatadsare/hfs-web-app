/**
 *
 * SendMobileConsent
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
import makeSelectSendMobileConsent from './selectors';
import reducer from './reducer';
import saga from './saga';

import { sendMobile } from './actions';

export function SendMobileConsent({
  mobile,
  appid,
  cuid,
  sendMobileConsent,
  dispatch,
}) {
  useInjectReducer({ key: 'sendMobileConsent', reducer });
  useInjectSaga({ key: 'sendMobileConsent', saga });

  const {
    mobileSent = false,
    loading = false,
    error = false,
  } = sendMobileConsent;

  function getStatusText() {
    if (mobileSent) {
      return `Link sent on ${mobile}`;
    }
    if (error) {
      return 'Failed to send link';
    }
    if (loading) {
      return 'Sending link...';
    }
    return 'Send confirmation link on mobile for user consent and verification.';
  }

  return (
    <div className="mt-4">
      <h5>Send Mobile Consent</h5>

      <div className="row mt-4">
        <div className="col col-sm-8 col-md-8">
          <p>{getStatusText()}</p>
          {/* TODO: Only for testing purpose */}
          {_.get(sendMobileConsent, 'error.link') ? (
            <a target="_verify" href={_.get(sendMobileConsent, 'error.link')}>
              Verify Mobile
            </a>
          ) : null}
        </div>
        <div className="col col-sm-4 col-md-4">
          <button
            type="button"
            className="btn button btn-lg button-primary btn-block"
            onClick={e => {
              e.preventDefault();
              dispatch(sendMobile({ mobile, appid, cuid }));
            }}
          >
            {mobileSent ? 'Resend Mobile Link' : ' Send Mobile Link'}
          </button>
        </div>
      </div>
    </div>
  );
}

SendMobileConsent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
  appid: PropTypes.string.isRequired,
  cuid: PropTypes.string.isRequired,
  sendMobileConsent: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  sendMobileConsent: makeSelectSendMobileConsent(),
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
)(SendMobileConsent);
