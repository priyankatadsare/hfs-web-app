import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { NUMBER_PATTERN, DECIMAL_PATTERN } from 'containers/App/constants';
import VerticalProgressBar from 'components/VerticalProgressBar';
import TenureDropdown from 'containers/TenureDropdown/Loadable';
import makeSelectApplicationPage from 'containers/ApplicationPage/selectors';
import makeSelectProgramTypeDropdown from 'containers/ProgramTypeDropdown/selectors';
import { updateApp } from 'containers/ApplicationPage/actions';
import InputField from 'components/InputField';
import ProgramTypeDropdown from '../ProgramTypeDropdown/Loadable';

function LoanOfferForm({ appDetails, dispatch, programTypeDropdown }) {
  const { masterProgData = {} } = programTypeDropdown;
  const appLtvDetails = _.get(appDetails, 'appResponse.appLtvDetails', {});
  const loanOffer = _.find(_.get(appDetails, 'appResponse.loanOffers', []), {
    type: 'applied_amount',
  });

  const loanSecurityDeposit = _.find(
    _.get(appDetails, 'appResponse.loanCharges', []),
    {
      chargeCode: 'CASHCLT',
    },
  );

  const { appId } = appDetails.appResponse || {};

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

  const onSubmit = data => {
    const masterData = JSON.parse(masterProgData[data.programType]);
    const appPayload = {
      loanOffers: [
        {
          id: (loanOffer || {}).id,
          loanAmount: parseFloat(data.loanAmount) * 100000,
          loanTenure: data.loanTenure,
          type: 'applied_amount',
          roi: parseFloat(masterData.roi),
        },
      ],
      appId,
    };
    if (masterData['programCode']) {
      appPayload['appLtvDetails'] = {
        id: (appLtvDetails || {}).id,
        custOriginalTenure: '',
        custOriginalROI: masterData.roi || '',
        advanceEMIAmt: '',
        programType: data.programType,
        programCode: masterData.programCode,
        ltvPercentage: '100',
      };
    } else {
      appPayload['appLtvDetails'] = {
        id: (appLtvDetails || {}).id,
        custOriginalTenure: '',
        custOriginalROI: '',
        advanceEMIAmt: '',
        securityDepositAmt: '',
        programType: data.programType,
        programCode: masterData.programCode,
        ltvPercentage: '',
      };
      if ((loanSecurityDeposit || {}).id) {
        appPayload['loanCharges'] = [
          {
            id: (loanSecurityDeposit || {}).id,
            amount: '',
            chargeCode: 'CASHCLT',
          },
        ];
      }
    }
    if (masterData['SD']) {
      appPayload['loanCharges'] = [
        {
          id: (loanSecurityDeposit || {}).id,
          amount:
            parseFloat(data.loanAmount) *
            100000 *
            (parseFloat(masterData['SD']) / 100),
          chargeCode: 'CASHCLT',
        },
      ];
      appPayload['appLtvDetails']['securityDepositAmt'] =
        parseFloat(data.loanAmount) *
        100000 *
        (parseFloat(masterData['SD']) / 100);
    } else if (masterData['advEmi']) {
      appPayload['appLtvDetails']['securityDepositAmt'] = '';
      if ((loanSecurityDeposit || {}).id) {
        appPayload['loanCharges'] = [
          {
            id: (loanSecurityDeposit || {}).id,
            amount: '',
            chargeCode: 'CASHCLT',
          },
        ];
      }
    }
    dispatch(updateApp(appPayload));
    // dispatch(updateApplication(appPayload));
  };

  const values = watch();
  useEffect(() => {
    // Pre-populate fields logic
    const { loanAmount = 0, loanTenure } = loanOffer || {};

    setValue([{ loanAmount: parseFloat(loanAmount) / 100000 }, { loanTenure }]);
  }, [loanOffer]);

  const checkTenureMnoths = async tenure =>
    parseInt(tenure, 10) > 60 || parseInt(tenure, 10) <= 0
      ? 'Max tenure of 60 months is allowed'
      : true;

  return (
    <form
      className="clix-form cutomerVerifyForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <VerticalProgressBar values={values} errors={errors} />
      <div className="row">
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="loanAmount"
            name="loanAmount"
            register={register({
              required: true,
              pattern: {
                value: DECIMAL_PATTERN,
                message: 'Please enter number/decimal only',
              },
              min: {
                value: 2,
                message:
                  'Loan amount should be greater than or equal to 2 lakh',
              },
            })}
            type="number"
            errors={errors}
            placeholder="Enter Loan Amount(in Lac units)"
            labelHtml={
              <label htmlFor="loanAmount">Loan Amount(in Lac Rs)</label>
            }
          />
        </div>
        <div className="col col-12 col-md-6">
          <InputField
            className="form-control"
            id="loanTenure"
            name="loanTenure"
            register={register({
              required: true,
              pattern: {
                value: NUMBER_PATTERN,
                message: 'Please enter numbers only',
              },
              validate: checkTenureMnoths,
            })}
            type="text"
            errors={errors}
            placeholder="Enter Loan Tenure(in months)"
            labelHtml={
              <label htmlFor="loanTenure">Loan Tenure(in months)</label>
            }
          />
          {/* <TenureDropdown
            name="loanTenure"
            errors={errors}
            register={register({ required: true })}
          /> */}
        </div>
        <div className="col col-12 col-md-6">
          <ProgramTypeDropdown
            name="programType"
            errors={errors}
            register={register({ required: true })}
          />
        </div>
      </div>
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
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  appDetails: makeSelectApplicationPage(),
  programTypeDropdown: makeSelectProgramTypeDropdown(),
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

export default compose(withConnect)(LoanOfferForm);
