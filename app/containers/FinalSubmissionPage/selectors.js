import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the finalSubmissionPage state domain
 */

const selectFinalSubmissionPageDomain = state =>
  state.finalSubmissionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FinalSubmissionPage
 */

const makeSelectFinalSubmissionPage = () =>
  createSelector(
    selectFinalSubmissionPageDomain,
    substate => substate,
  );

export default makeSelectFinalSubmissionPage;
export { selectFinalSubmissionPageDomain };
