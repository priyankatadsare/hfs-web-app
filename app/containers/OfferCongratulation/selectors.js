import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offerCongratulation state domain
 */

const selectOfferCongratulationDomain = state =>
  state.offerCongratulation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OfferCongratulation
 */

const makeSelectOfferCongratulation = () =>
  createSelector(
    selectOfferCongratulationDomain,
    substate => substate,
  );

export default makeSelectOfferCongratulation;
export { selectOfferCongratulationDomain };
