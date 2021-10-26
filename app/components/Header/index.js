/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import Wrapper from './style';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Header({ currentUser, logOut }) {
  const history = useHistory();
  function handleLogout() {
    logOut();
    sessionStorage.removeItem('actorId');
    history.replace('/login');
  }
  return (
    // <div>
    //   <FormattedMessage {...messages.header} />
    // </div>
    <>
      <Wrapper className="clix-header">
        <div className="image">
          <img src="/logo.png" style={{}} />
          {currentUser ? (
            <button
              className="btn button button-customSmall btn-linePrimary"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  );
}

Header.propTypes = {};

export default memo(Header);
