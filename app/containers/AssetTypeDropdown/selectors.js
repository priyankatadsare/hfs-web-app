import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assetTypeDropdown state domain
 */

const selectAssetTypeDropdownDomain = state =>
  state.assetTypeDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssetTypeDropdown
 */

const makeSelectAssetTypeDropdown = () =>
  createSelector(
    selectAssetTypeDropdownDomain,
    substate => substate,
  );

export default makeSelectAssetTypeDropdown;
export { selectAssetTypeDropdownDomain };
