import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the modalOtp state domain
 */

const selectModalOtpDomain = state => state.modalOtp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ModalOtp
 */

const makeSelectModalOtp = () =>
  createSelector(
    selectModalOtpDomain,
    substate => substate,
  );
const makeSelectOTPSuccess = () =>
  createSelector(
    selectModalOtpDomain,
    substate => substate.otpSuccess,
  );

const makeSelectOTPLoading = () =>
  createSelector(
    selectModalOtpDomain,
    substate => substate.otpLoading,
  );

const makeSelectRequestId = () =>
  createSelector(
    selectModalOtpDomain,
    substate => substate.requestId,
  );

export default makeSelectModalOtp;
export {
  selectModalOtpDomain,
  makeSelectOTPSuccess,
  makeSelectOTPLoading,
  makeSelectRequestId,
};
