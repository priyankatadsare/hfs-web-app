/**
 *
 * MasterOptionSelect
 *
 */

import React, { useEffect } from 'react';
// import { useField, splitFormProps } from 'react-form';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/index';
// import styled from 'styled-components';

const defaults = {
  populatedClass: 'populated',
  focusedClass: 'focused',
};

function MasterOptionSelect({
  options,
  register,
  labelHtml,
  initialValue,
  errors,
  name,
  onBlurAction,
  ...rest
}) {
  // const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);
  const reference = React.createRef();
  const [value, setValue] = React.useState(initialValue);

  // useEffect(() => {
  //   reference.current &&
  //   reference.current.getElementsByTagName('select')[0].value
  //     ? reference.current.classList.add('populated')
  //     : '';
  // }, [reference]);
  // const {
  //   value = "Total Work Experience",
  //   setValue,
  //   meta: { error, isTouched }
  // } = useField(field, fieldOptions);

  const handleSelectChange = e => {
    setValue(initialValue !== e.target.value ? e.target.value : '');
  };
  const handleBlur = event => {
    if (!event.target.value || initialValue === event.target.value) {
      // reference.current.classList.remove('populated');
    }
    if (onBlurAction) onBlurAction();
  };

  const handleFocus = event => {
    event.target.classList.add(defaults.focusedClass);
    reference.current.classList.add('populated');
  };
  return true ? (
    <div
      className={`form-group has-float-label populated ${
        errors[name] ? `has-error` : ``
      }`}
      ref={reference}
    >
      {labelHtml}
      <select
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        onChange={handleSelectChange}
        ref={register}
      >
        <option key={initialValue} value="">
          {initialValue}
        </option>
        {options.map(option => (
          <option key={option.cmCode} value={option.cmCode}>
            {option.cmValue}
          </option>
        ))}
      </select>{' '}
      <ErrorMessage name={name} errors={errors} />
    </div>
  ) : (
    <div className="form-group has-float-label" ref={reference}>
      {labelHtml}
      <select
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSelectChange}
        ref={register}
      >
        <option value="">{initialValue}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>{' '}
    </div>
  );
}

MasterOptionSelect.propTypes = {
  initialValue: PropTypes.string.isRequired,
};

export default MasterOptionSelect;
