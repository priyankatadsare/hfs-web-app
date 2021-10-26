/**
 *
 * RelationshipDropDown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRelationshipDropDown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function RelationshipDropDown({
  name,
  relationshipDropDown,
  dispatch,
  ...rest
}) {
  useInjectReducer({ key: 'relationshipDropDown', reducer });
  useInjectSaga({ key: 'relationshipDropDown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.ASSET_TYPE));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Relationship"
      options={relationshipDropDown.response || []}
      labelHtml={<label htmlFor="workex">Select Relationship</label>}
      {...rest}
    />
  );
}

RelationshipDropDown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  relationshipDropDown: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  relationshipDropDown: makeSelectRelationshipDropDown(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RelationshipDropDown);
