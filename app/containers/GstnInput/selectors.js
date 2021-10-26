import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the GstnInput state domain
 */

const selectGstnInputDomain = state => state.gstnInput || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GstnInput
 */

const makeGstnInput = () =>
  createSelector(
    selectGstnInputDomain,
    substate => substate,
  );

export default makeGstnInput;
export { selectGstnInputDomain };
