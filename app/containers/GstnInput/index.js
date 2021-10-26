/**
 *
 * GstnInput
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeGstnInput from './selectors';
import reducer from './reducer';
import saga from './saga';

import OptionsSelect from '../../components/OptionSelect';
import { fetchGstn } from './actions';

export function GstnInput({
  name,
  gstnInput,
  dispatch,
  setError,
  clearError,
  ...rest
}) {
  useInjectReducer({ key: 'gstnInput', reducer });
  useInjectSaga({ key: 'gstnInput', saga });

  useEffect(() => {
    dispatch(fetchGstn());
  }, []);

  return (
    <>
      <OptionsSelect
        name={name}
        className="form-control clix-select custom-select"
        initialValue="Select Gstn"
        options={gstnInput.response || []}
        setError={setError}
        labelHtml={<label htmlFor="workex">Select Gstn</label>}
        {...rest}
      />
    </>
  );
}

GstnInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gstnInput: PropTypes.object,
  name: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gstnInput: makeGstnInput(),
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
)(GstnInput);
