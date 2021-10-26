import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentUpload state domain
 */

const selectDocumentUploadDomain = state =>
  state.documentUpload || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentUpload
 */

const makeSelectDocumentUpload = () =>
  createSelector(
    selectDocumentUploadDomain,
    substate => substate,
  );

export default makeSelectDocumentUpload;
export { selectDocumentUploadDomain };
