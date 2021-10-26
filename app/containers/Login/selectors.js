import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

const makeSelectFormData = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.formData,
  );

export default makeSelectLogin;
export { selectLoginDomain, makeSelectFormData };
