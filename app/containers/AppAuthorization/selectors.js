import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app auth state domain
 */

const selectAppAuthDomain = state => state.appAuthorization || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const makeSelectAppAuthDetails = () =>
  createSelector(
    selectAppAuthDomain,
    substate => substate,
  );

export default makeSelectAppAuthDetails;
export { selectAppAuthDomain };
