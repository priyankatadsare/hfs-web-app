/**
 *
 * UserProfile
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fetchUser } from './actions';
export function UserProfile({ fetchUser, userProfile }) {
  useInjectReducer({ key: 'userProfile', reducer });
  useInjectSaga({ key: 'userProfile', saga });
  useEffect(() => {
    fetchUser();
  }, []);
  const {
    response: {
      firstName,
      registeredName,
      lastName,
      contactibilities,
      identities = {},
      cuid,
      dateOfBirthIncorporation,
      ...rest
    },
  } = userProfile;
  const phoneNumber = _.get(
    _.reject(contactibilities, contact => !contact.phoneNumber),
    '[0][phoneNumber]',
  );
  const email = _.get(
    _.reject(contactibilities, contact => !contact.email),
    '[0][email]',
  );

  return (
    <div className="col col-12 col-lg-3">
      <div className="maCards">
        <div className="maCard blueCard">
          <div className="maTitle">Personal Details</div>

          {/* <div className="maSubTitle">Payment of Current Loans</div> */}

          <div className="maCard">
            <div className="iconHead">
              <i className="clixicon-personal-info" />
              <strong
                style={{
                  margin: '0px 10px',
                  color: '#b90c5c',
                }}
              >
                Customer ID: {cuid}
              </strong>
            </div>
            <div className="flexData mt-4">
              <div className="flexRow">
                {firstName && (
                  <>
                    <span>First Name</span>
                    <strong>{firstName}</strong>
                  </>
                )}
                {registeredName && (
                  <>
                    <span>Entity Name</span>
                    <strong>{registeredName}</strong>
                  </>
                )}
              </div>
              {lastName && (
                <div className="flexRow">
                  <span>Last Name</span>
                  <strong>{lastName}</strong>
                </div>
              )}
              <div className="flexRow">
                <span>PAN</span>
                <strong>{identities.pan}</strong>
              </div>
              <div className="flexRow">
                <span>Mobile Number</span>
                <strong>{phoneNumber}</strong>
              </div>
              <div className="flexRow">
                <span>{`Date of ${
                  rest.type === 'COMPANY' ? 'Incorporation' : 'Birth'
                }`}</span>
                <strong>{dateOfBirthIncorporation}</strong>
              </div>
              <div className="flexRow" style={{ width: '100%' }}>
                <span>E-Mail</span>
                <strong>{email}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserProfile);
