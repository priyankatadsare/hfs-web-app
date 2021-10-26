/**
 *
 * NoOffer
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { toLocaleString } from '../../utils/helpers';

function NoOffer({
  rejectReason,
  rejectReview,
  applicationStatus,
  loanAmount,
  customerName,
  appid,
}) {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: 'inherit' }}
    >
      <div className="clix-container p-3" style={{ margin: 'auto' }}>
        <div className="congratulation-container text-center">
          <div className="congratulation-inn">
            {/* <div className="gif-main">
              <img src="no-offer.png" alt="no offer" />
            </div> */}
            <div className="cong-title">
              Dear {customerName} <br />
            </div>
            {rejectReason === 'DEDUPE_REJECTED' ? (
              <>
                <div className="cong-msg">
                  Looks like you had applied for a loan with Clix earlier too.
                  <br />
                  Please allow us sometime to check our database and update your
                  application #
                  <span className="cong-title">
                    {'HFS'}
                    {appid}.
                  </span>{' '}
                  We will notify you once its done.
                </div>
              </>
            ) : (
              <div>
                {!rejectReview ? (
                  <div className="cong-msg">
                    We regret to inform you that your Clix loan application #
                    <span className="cong-title">
                      {'HFS'}
                      {appid}
                    </span>{' '}
                    could not be processed at this time. However, we regularly
                    review the rejected applications and we will reach out to
                    you, in case of revised approval on your application. <br />
                    Please visit www.clix.capital to explore more options
                  </div>
                ) : (
                  <div className="cong-msg">
                    O wow! Our system has approved your application for a
                    whopping <span>{toLocaleString(loanAmount, true)}</span> of
                    loan which as per our policy will need to be reviewed by our
                    credit manager. Your application will be reviewed on
                    priority. We will keep you posted. Your application ID is
                    <span className="cong-title">
                      {` `}
                      {'HFS'}
                      {appid}
                    </span>{' '}
                  </div>
                )}
              </div>
            )}
            {/* <div className="cong-msg">We will reach out to you shortly.</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

NoOffer.propTypes = {};

export default NoOffer;
