/**
 *
 * Address
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Address({ addresses = [], setCurentAddress }) {
  const createAddressList = () => {
    // callback to create List of address for UI
    if (addresses.length > 0) {
      return addresses.map(item => (
        <div className="row col-12">
          <div className="col col-sm-8 col-md-8">
            {item.addressLine1} {item.addressLine2} {item.addressLine3}{' '}
            {item.locality}
            {item.city} {item.pincode} {item.state}
          </div>
          <a
            onClick={() => {
              setCurentAddress(item);
            }}
          >
            <h4>{`Edit`} &nbsp; &#9998;</h4>
          </a>
        </div>
      ));
    }
    return <> </>;
  };

  return (
    <>
      <div className="row">
        <div className="col col-12 col-md-12">
          <div
            className="row justify-content-between"
            style={{ padding: '1rem' }}
          >
            <h5>Addresses</h5>
            <button
              type="button"
              className="btn button btn-lg button-primary"
              onClick={e => {
                e.preventDefault();
                setCurentAddress();
              }}
            >
              Add Address
            </button>
          </div>
          <div className="row">{createAddressList()}</div>
        </div>
      </div>
    </>
  );
}

Address.propTypes = {
  addresses: PropTypes.array,
};

export default memo(Address);
