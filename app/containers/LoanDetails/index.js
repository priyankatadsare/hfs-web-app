/**
 *
 * LoanDetails
 *
 */

import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import { Accordion, Card } from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NextAction from 'containers/NextAction/Loadable';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import InputField from '../../components/InputField';
import CustomToggle from '../../components/CustomToggle';
import makeSelectLoanDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectApplicationPage from '../ApplicationPage/selectors';
import makeSelectAssetTypeDropdown from '../AssetTypeDropdown/selectors';
import { isJson } from '../../utils/helpers';
import Skelton from '../../components/Skelton';
import { updateApp, callCommercialBureau } from '../ApplicationPage/actions';
import AssetForm from './AssetForm';
import CollateralDetail from './CollateralDetail';
import LoanOfferForm from './LoanOfferForm';

export function LoanDetails({ dispatch, globalState, assetType }) {
  useInjectReducer({ key: 'loanDetails', reducer });
  useInjectSaga({ key: 'loanDetails', saga });

  const formRef = useRef(null);

  const [currentAsset, setcurrentAsset] = useState(false);
  const [addAsset, setaddAsset] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    errors,
    // formState,
    setValue,
  } = useForm({
    mode: 'onChange',
  });

  const values = watch();

  console.log('Loan details form values', values);

  const { appId, appCollaterals = [], loanOffers = [], users = [] } =
    globalState.appResponse || {};
  const currentUser = { ...users[0] } || {};

  useEffect(() => {
    setcurrentAsset(false);
    if (appCollaterals.length) {
      setaddAsset(true);
    } else {
      setaddAsset(false);
    }
  }, [appCollaterals]);

  const handleSetAsset = asset => {
    setaddAsset(false);
    setcurrentAsset(asset);
  };

  const onSubmit = data => {
    const { masterAssetType = {} } = assetType;
    const appPayload = {
      appCollaterals: [
        {
          id: _.get(currentAsset || {}, 'id'),
          brand: data.manufacturer,
          assetType:
            data.assetType.toLowerCase() === 'others'
              ? data.assetTypeTextValue
              : data.assetType,
          assetPrice: parseFloat(data.assetPrice) * 100000,
          assetCondition: data.assetCondition,
          assetCategory: masterAssetType[data.assetType] || '',
          assetUnit: data.assetUnit,
          assetMarginMoney: data.assetMarginMoney,
          marginMoney: data.marginMoney,
          assetInstallationPlace: data.assetInstallationPlace,
          collateralLocation: data.collateralLocation,
          assetDealer:
            data.assetDealer.toLowerCase() === 'others'
              ? data.supplierTextValue
              : data.assetDealer,
          assetModel: data.assetModel,
          description: JSON.stringify({
            downPaymentMode: data.downPaymentMode,
          }),
        },
      ],
      appId,
    };
    dispatch(updateApp(appPayload));
  };

  const handleNextClick = () => {
    if (_.get(currentUser, 'type', '') !== 'INDIVIDUAL')
      dispatch(callCommercialBureau(currentUser));
  };

  return (
    <div>
      <Helmet>
        <title>LoanDetails</title>
        <meta name="description" content="Description of LoanDetails" />
      </Helmet>
      <Skelton loading={globalState.loading}>
        <div className="d-flex justify-content-center">
          <div className="clix-container p-3">
            <Accordion defaultActiveKey="0" className="clix-accordion">
              <Card className="active">
                <Card.Header>
                  <CustomToggle eventKey="0">
                    <span className="icon">
                      <i className="clixicon-personal-info before" />
                    </span>
                    Loan Details
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="progress-form clix-form disbursal-bank-detail">
                    <div className="progress-form-inn">
                      {appCollaterals.map((asset, index) => (
                        <>
                          <CollateralDetail
                            formRef={formRef}
                            index={index + 1}
                            asset={asset}
                            setcurrentAsset={handleSetAsset}
                          />
                          <hr className="mt-4 mb-4" />
                        </>
                      ))}
                      {/* ----------Loan details Application form starts below---------- */}
                      {addAsset ? (
                        <div className="row justify-content-between">
                          <button
                            type="button"
                            style={{
                              float: 'right',
                            }}
                            className="btn button button-secondary"
                            onClick={e => {
                              e.preventDefault();
                              setaddAsset(false);
                              setcurrentAsset(false);
                            }}
                          >
                            Add More
                          </button>
                        </div>
                      ) : null}
                      {currentAsset || !addAsset ? (
                        <>
                          <div
                            className="row justify-content-between"
                            style={{ padding: '1rem' }}
                            ref={formRef}
                          >
                            <h5>{`${currentAsset ? 'Edit' : 'New'} Asset`}</h5>
                            {appCollaterals.length ? (
                              <button
                                type="button"
                                style={{ float: 'left' }}
                                className="btn button  button-secondary"
                                onClick={e => {
                                  e.preventDefault();
                                  setaddAsset(true);
                                  setcurrentAsset(false);
                                }}
                              >
                                Cancel
                              </button>
                            ) : null}
                          </div>
                          <form
                            className="clix-form cutomerVerifyForm"
                            ref={formRef}
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <VerticalProgressBar
                              values={values}
                              errors={errors}
                            />
                            <div className={`customer-verify-blk ${'active'}`}>
                              <AssetForm
                                register={register}
                                setValue={setValue}
                                asset={currentAsset}
                                errors={errors}
                                values={values}
                              />
                              <div className="row phone-hide-blk">
                                <div className="col col-12 col-md-6">
                                  <button
                                    className="btn button btn-lg button-primary btn-block arrowBtn mt-4"
                                    type="submit"
                                    // disabled={!formState.isValid}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </>
                      ) : null}
                      {addAsset ||
                      (!addAsset && currentAsset) ||
                      !currentAsset ? (
                        <>
                          <hr className="mt-4 mb-4" />
                          <LoanOfferForm />
                        </>
                      ) : null}

                      <NextAction
                        onClick={handleNextClick}
                        payload={{ uiStage: 'LOAN_DETAILS' }}
                        show={appCollaterals.length && loanOffers.length}
                      />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </Skelton>
    </div>
  );
}

LoanDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  globalState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loanDetails: makeSelectLoanDetails(),
  globalState: makeSelectApplicationPage(),
  assetType: makeSelectAssetTypeDropdown(),
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
)(LoanDetails);
