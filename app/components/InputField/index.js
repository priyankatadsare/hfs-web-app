/**
 *
 * Input
 *
 */

import React, { useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/index';

const defaults = {
  populatedClass: 'populated',
  focusedClass: 'focused',
};
const InputField = ({
  name,
  register,
  wrapperClassname,
  prefix,
  postfix,
  labelHtml,
  errors,
  onBlurAction,
  ...rest
}) => {
  const reference = React.createRef();

  useEffect(() => {
    reference.current &&
    reference.current.getElementsByTagName('input')[0].value
      ? reference.current.classList.add('populated')
      : '';
  }, [reference]);

  const handleBlur = event => {
    rest.onBlur && rest.onBlur();
    if (!event.target.value) reference.current.classList.remove('focused');
    event.target.classList.remove('focused');
    reference.current.classList.remove('focused');
    onBlurAction ? onBlurAction() : '';
  };

  const handleFocus = event => {
    event.target.classList.add(defaults.focusedClass);
    reference.current.classList.add('focused');
  };
  if (!labelHtml) {
    return (
      <>
        <input tabIndex={0} ref={register} name={name} {...rest} />
        <ErrorMessage name={name} errors={errors} />
      </>
    );
  }

  return (
    <div
      className={`form-group has-float-label populated${
        errors[name] ? `has-error` : ``
      }`}
      ref={reference}
    >
      {labelHtml}
      <div className={wrapperClassname}>
        {prefix}
        <input
          onFocus={handleFocus}
          ref={register}
          name={name}
          {...rest}
          onBlur={handleBlur}
        />
        {postfix}
      </div>
      {rest.pp}
      <ErrorMessage name={name} errors={errors} />
    </div>
  );
};

InputField.propTypes = {};

export default InputField;
