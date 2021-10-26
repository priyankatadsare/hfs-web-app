/**
 *
 * NextAction
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { updateLead } from 'containers/ApplicationPage/actions';
export function NextAction({
  buttonText,
  payload,
  dispatch,
  show,
  onClick = () => {},
}) {
  const handleUpdate = () => {
    onClick();
    dispatch(updateLead(payload));
  };

  if (show) {
    return (
      <div className="row phone-hide-blk">
        <div className="col col-12 col-md-6">
          <button
            className="btn button btn-lg button-secondary btn-block arrowBtn mt-4"
            type="button"
            onClick={handleUpdate}
          >
            {buttonText || 'Next'}
          </button>
        </div>
      </div>
    );
  }
  return null;
}

NextAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NextAction);
