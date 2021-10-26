/**
 *
 * DashboardPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RunningApplication from 'components/RunningApplication/Loadable';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadApps } from './actions';
import FilterPopup from '../FilterPopup/Loadable';
import makeSelectFilterPopup from '../FilterPopup/selectors';
import './styles.css';
import { setFilter } from '../FilterPopup/actions';
import Skelton from '../../components/Skelton';

export function ListActivities({
  response,
  selectedState,
  history,
  hideCTA,
  loading,
}) {
  useEffect(() => {
    history.push(`/dashboard/${selectedState}`);
  }, [selectedState]);
  return (
    <Skelton loading={loading}>
      {response && response.length > 0 ? (
        (response || []).map(app => (
          <RunningApplication
            key={app.applicationId}
            runningApplication={app}
            hideCTA={hideCTA}
            // fetchAppDetails={fetchAppDetails}
          />
        ))
      ) : (
        <div className="maCards">
          <div className="maCard blueCard">No applications to display</div>
        </div>
      )}
    </Skelton>
  );
}

export function DashboardPage({ loadApps, dashboardPage, filters, dispatch }) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });
  const { state } = useParams();
  const history = useHistory();
  const [selectedState, setSelectedState] = useState(state);
  useEffect(() => {
    loadApps(state);
  }, [state]);
  const { response, loading = false } = dashboardPage;
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const clearFilter = (e, type) => {
    e.preventDefault();
    if (type === 'customerName') {
      dispatch(setFilter({ pan: filters.panNumber, customerName: '' }, state));
    } else {
      dispatch(
        setFilter({ pan: '', customerName: filters.customerName }, state),
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>LoanApplications</title>
        <meta name="description" content="Description of LoanApplications" />
      </Helmet>
      <div className="row account-main">
        <div className="col col-12 col-lg-10">
          <div className="am-blocks">
            <div className="am-block">
              <div className="headingBlk d-flex justify-content-between">
                <h1 className="icon-heading">
                  <i className="clixicon-applications" /> My Application
                </h1>

                <Link
                  to="/applications/new"
                  className="btn button button-customSmall btn-linePrimary"
                >
                  New Application
                </Link>
              </div>

              <div className="sub-heading">
                <div className="maTabs" style={{ width: '85%' }}>
                  <Tabs
                    defaultActiveKey={state}
                    id="uncontrolled-tab-example"
                    className="nav nav-tabs"
                    onSelect={k => setSelectedState(k)}
                  >
                    <Tab eventKey="open" title="Open Applications">
                      {selectedState == 'open' && (
                        <ListActivities
                          response={response}
                          selectedState={selectedState}
                          history={history}
                          loading={loading}
                        />
                      )}
                    </Tab>
                    <Tab eventKey="pending" title="Pending Applications">
                      {selectedState == 'pending' && (
                        <ListActivities
                          response={response}
                          selectedState={selectedState}
                          history={history}
                          hideCTA={true}
                          loading={loading}
                        />
                      )}
                    </Tab>
                    <Tab eventKey="closed" title="Closed Applications">
                      {selectedState == 'closed' && (
                        <ListActivities
                          response={response}
                          selectedState={selectedState}
                          history={history}
                          hideCTA={true}
                          loading={loading}
                        />
                      )}
                    </Tab>
                  </Tabs>
                </div>
                <div className="d-flex" style={{ flexDirection: 'column' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      e.preventDefault();
                      setShowFilterPopup(true);
                    }}
                  >
                    <span style={{ margin: '5px', marginLeft: '0' }}>
                      &#9998;
                    </span>
                    Add Filter
                  </div>
                  {filters.panNumber && (
                    <div style={{ marginLeft: '15px' }}>
                      {filters.panNumber}
                      <span
                        className="close close-btn"
                        aria-hidden="true"
                        onClick={e => {
                          clearFilter(e, 'panNumber');
                        }}
                      >
                        ×
                      </span>
                    </div>
                  )}
                  {filters.customerName && (
                    <div style={{ marginLeft: '15px' }}>
                      {filters.customerName}
                      <span
                        className="close close-btn"
                        aria-hidden="true"
                        onClick={e => {
                          clearFilter(e, 'customerName');
                        }}
                      >
                        ×
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterPopup
        showFilterPopup={showFilterPopup}
        setShowFilterPopup={setShowFilterPopup}
        state={state}
      />
    </div>
  );
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
  filters: makeSelectFilterPopup(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadApps: state => dispatch(loadApps(state)),
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
)(DashboardPage);
