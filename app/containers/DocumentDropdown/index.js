/**
 *
 * DocumentDropdown
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDocumentDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { getMasterData } from './actions';
import { MasterNames } from '../App/constants';

export function DocumentDropdown({
  name,
  documentDropdown,
  dispatch,
  selectedApplicantType,
  ...rest
}) {
  useInjectReducer({ key: 'documentDropdown', reducer });
  useInjectSaga({ key: 'documentDropdown', saga });

  useEffect(() => {
    dispatch(getMasterData(MasterNames.DOCUMENTS));
  }, []);

  return (
    <OptionsSelect
      name={name}
      className="form-control clix-select custom-select"
      initialValue="Select Document"
      options={
        (selectedApplicantType &&
          documentDropdown.response[selectedApplicantType]) ||
        []
      }
      // options={DOCUMENTS_LIST}
      labelHtml={<label htmlFor="workex">Select Document</label>}
      {...rest}
    />
  );
}

DocumentDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  documentDropdown: PropTypes.object,
  name: PropTypes.string.isRequired,
  selectedApplicantType: PropTypes.string,
};

DocumentDropdown.defaultProps = {
  selectedApplicantType: '',
};

const mapStateToProps = createStructuredSelector({
  documentDropdown: makeSelectDocumentDropdown(),
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
)(DocumentDropdown);
