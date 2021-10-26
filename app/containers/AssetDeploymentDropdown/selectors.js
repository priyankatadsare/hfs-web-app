import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AssetDeploymentDropdown state domain
 */

const selectAssetDeploymentDropdownDomain = state =>
  state.AssetDeploymentDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssetDeploymentDropdown
 */

const makeSelectAssetDeploymentDropdown = () =>
  createSelector(
    selectAssetDeploymentDropdownDomain,
    substate => substate,
  );

export default makeSelectAssetDeploymentDropdown;
export { selectAssetDeploymentDropdownDomain };
