import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the RelationshipDropDown state domain
 */

const selectRelationshipDropDownDomain = state =>
  state.relationshipDropDown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RelationshipDropDown
 */

const makeSelectRelationshipDropDown = () =>
  createSelector(
    selectRelationshipDropDownDomain,
    substate => substate,
  );

export default makeSelectRelationshipDropDown;
export { selectRelationshipDropDownDomain };
