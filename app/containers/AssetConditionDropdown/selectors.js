import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assetConditionDropdown state domain
 */

const selectAssetConditionDropdownDomain = state =>
  state.assetConditionDropdown || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssetConditionDropdown
 */

const makeSelectAssetConditionDropdown = () =>
  createSelector(
    selectAssetConditionDropdownDomain,
    substate => substate,
  );

export default makeSelectAssetConditionDropdown;
export { selectAssetConditionDropdownDomain };
