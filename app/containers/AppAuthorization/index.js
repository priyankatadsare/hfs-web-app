import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from '../../utils/injectSaga';
import useInjectReducer from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import { checkAuthorization } from './actions';

import makeSelectAppAuthDetails from './selectors';
import NotFoundPage from '../../components/PageNotFound';

export function AppAuthorization({
  dispatch,
  appAuthDetails,
  component,
  activity,
}) {
  const { roles, loading } = appAuthDetails;

  useEffect(() => {
    dispatch(checkAuthorization(activity));
  }, [activity]);

  return (
    <>
      {roles && !roles[activity] ? (
        <NotFoundPage
          message="Sorry, You are not authorized to see this Page!"
          title="Access Denied"
        />
      ) : (
        <div>{component}</div>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  appAuthDetails: makeSelectAppAuthDetails(),
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

const withReducer = useInjectReducer({ key: 'appAuthorization', reducer });
const withSaga = useInjectSaga({ key: 'appAuthorization', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  memo,
)(AppAuthorization);
