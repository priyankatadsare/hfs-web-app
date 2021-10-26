import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userUploadedDocSection state domain
 */

const selectUserUploadedDocSectionDomain = state =>
  state.userUploadedDocSection || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserUploadedDocSection
 */

const makeSelectUserUploadedDocSection = () =>
  createSelector(
    selectUserUploadedDocSectionDomain,
    substate => substate,
  );

export default makeSelectUserUploadedDocSection;
export { selectUserUploadedDocSectionDomain };
