import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myAccountPage state domain
 */

const selectMyAccountPageDomain = state => state.myAccountPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyAccountPage
 */

const makeSelectMyAccountPage = () =>
  createSelector(
    selectMyAccountPageDomain,
    substate => substate,
  );

export default makeSelectMyAccountPage;
export { selectMyAccountPageDomain };
