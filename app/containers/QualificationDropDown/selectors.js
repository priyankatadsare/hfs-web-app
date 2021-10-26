import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the qualificationDropDown state domain
 */

const selectQualificationDropDownDomain = state =>
  state.qualificationDropDown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QualificationDropDown
 */

const makeSelectQualificationDropDown = () =>
  createSelector(
    selectQualificationDropDownDomain,
    substate => substate,
  );

export default makeSelectQualificationDropDown;
export { selectQualificationDropDownDomain };
