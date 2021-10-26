/**
 *
 * CheckConsent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCheckConsent from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getConsent } from './actions';

export function CheckConsent({ checkConsent, dispatch, leadId }) {
  useInjectReducer({ key: 'checkConsent', reducer });
  useInjectSaga({ key: 'checkConsent', saga });

  const {
    consentVerified = false,
    error = false,
    loading = false,
  } = checkConsent;

  function getStatusText() {
    if (consentVerified) {
      return 'Please provide Email and Mobile consent both';
    }
    if (error) {
      return `User consent awaited`;
    }
    if (loading) {
      return 'Checking consent';
    }
    return 'Once the consent is provided, your application process will move ahead.';
  }

  return (
    <div className="mt-4">
      <h5>Check Consent Status</h5>

      <div className="row mt-4">
        <div className="col col-sm-8 col-md-8">
          <p>{getStatusText()}</p>
        </div>
        <div className="col col-sm-4 col-md-4">
          <button
            type="button"
            className="btn button btn-lg button-primary btn-block"
            onClick={e => {
              e.preventDefault();
              dispatch(getConsent(leadId));
            }}
          >
            Check Consent
          </button>
        </div>
      </div>
    </div>
  );
}

CheckConsent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  leadId: PropTypes.string.isRequired,
  checkConsent: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkConsent: makeSelectCheckConsent(),
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
)(CheckConsent);
