/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectWaitingModal = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.show,
  );
const makeSelectServerErrorModal = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.internalServerError,
  );

const makeSelectCommonErrorModal = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.commonError,
  );

const makeSelectCommonErroMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.commonErrorMessage,
  );

const makeSelectGlobalState = () =>
  createSelector(
    selectGlobal,
    globalState => globalState,
  );
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectWaitingModal,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectServerErrorModal,
  makeSelectCommonErrorModal,
  makeSelectCommonErroMessage,
  makeSelectGlobalState,
};
