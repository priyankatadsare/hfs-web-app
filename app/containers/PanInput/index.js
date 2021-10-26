/**
 *
 * PanInput
 *
 */

import _ from 'lodash';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPanInput from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputField from '../../components/InputField';
import { fetchPan } from './actions';

export function PanInput({
  panInput,
  name,
  placeholder,
  postfix,
  dispatch,
  setError,
  ...rest
}) {
  useInjectReducer({ key: 'panInput', reducer });
  useInjectSaga({ key: 'panInput', saga });

  useEffect(() => {
    const pan = panInput.payload;
    const panStatus = _.get(panInput, `response.${pan}.panStatus`);
    if (panStatus === 'Record (PAN) Not Found in ITD Database/Invalid PAN') {
      setError(name, 'pattern', panStatus);
    }
  }, [panInput.response]);

  function fetchPanData(pan) {
    const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regex.test(pan)) {
      // Call PAN API
      dispatch(fetchPan(pan));
    }
  }

  return (
    <div>
      <InputField
        className="form-control"
        id={name}
        name={name}
        type="text"
        maxLength="10"
        placeholder={placeholder}
        {...rest}
        labelHtml={<label htmlFor="mobile">{placeholder}</label>}
        postfix={postfix}
        onChange={e => fetchPanData(e.target.value)}
      />
    </div>
  );
}

PanInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  postfix: PropTypes.object,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  panInput: makeSelectPanInput(),
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
)(PanInput);
