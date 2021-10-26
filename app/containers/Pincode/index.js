/**
 *
 * Pincode
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import InputField from 'components/InputField';
import useDebounce from './debounceHook';
import makeSelectPincode, { makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getLocation, getLocationSuccess, setLoading } from './actions';
export function Pincode({
  searchCharacters,
  errors,
  register,
  location,
  pincode,
  setError,
  clearError,
  setLoad,
  dispatch,
  currentPincodeValue = false,
  ...rest
}) {
  useInjectReducer({ key: 'pincode', reducer });
  useInjectSaga({ key: 'pincode', saga });

  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  // const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (pincode.error && pincode.error.status === 'failure') {
      setError('pin', 'pattern', pincode.error.message);
    }
  }, [pincode.error]);

  useEffect(() => {
    // console.log($('#pin')[0].value);
    // if ($('#pin')[0].value && $('#pin')[0].value.length === 6) {
    //   searchCharacters($('#pin')[0].value);
    // }
    clearError();
    if (currentPincodeValue) dispatch(getLocation(currentPincodeValue));
    else dispatch(getLocationSuccess(false));
  }, []);
  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        // setIsSearching(true);
        // Fire off our API call
        if (searchTerm.length === 6) {
          searchCharacters(debouncedSearchTerm);
          // .then(res => {
          //   if (location && location.states) {
          //     clearError();
          //   }
          // });
        }
        // .then(results => {
        //   // Set back to false since request finished
        //   setIsSearching(false);
        //   // Set results state
        //   setResults(results);
        // });
      }

      // if (location && location.states) {
      //   clearError();
      // }
      // if (location === null && searchTerm.length === 6) {
      //   setError('pin', 'pattern', 'No location for this zipcode');
      // }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );

  if (pincode.loading) {
    if (location && location.states) {
      clearError();
      setLoad(false);
    }
  }

  return (
    <>
      <InputField
        type="text"
        className="form-control"
        id="pin"
        name="pin"
        onChange={e => setSearchTerm(e.target.value)}
        register={register}
        placeholder="Pincode"
        errors={errors}
        {...rest}
        postfix={
          <>
            {isSearching && <div>Searching ...</div>}
            {location && !pincode.error ? (
              <span className="control-note">
                {location.states[0].cities[0].name}, {location.states[0].name}
              </span>
            ) : (
              <>
                {!pincode.error && (
                  <span className="control-note">
                    Pincode of {rest.type || 'current'} address as per your ID
                    proof
                  </span>
                )}
              </>
            )}
          </>
        }
        labelHtml={<label htmlFor="pin">Pincode</label>}
      />
    </>
  );
}

Pincode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pincode: makeSelectPincode(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchCharacters: search => {
      console.log('Search term', search);
      return dispatch(getLocation(search));
    },
    setLoad: data => {
      dispatch(setLoading(false));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Pincode);
