import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the panInput state domain
 */

const selectPanInputDomain = state => state.panInput || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PanInput
 */

const makeSelectPanInput = () =>
  createSelector(
    selectPanInputDomain,
    substate => substate,
  );

export default makeSelectPanInput;
export { selectPanInputDomain };
