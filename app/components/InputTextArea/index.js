/**
 *
 * TextArea
 *
 */

import React, { useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/index';

const defaults = {
  populatedClass: 'populated',
  focusedClass: 'focused',
};
const InputTextArea = ({
  name,
  register,
  wrapperClassname,
  prefix,
  postfix,
  labelHtml,
  errors,
  onBlurAction,
  rows = 4,
  cols = 50,
  ...rest
}) => {
  const reference = React.createRef();

  useEffect(() => {
    reference.current &&
    reference.current.getElementsByTagName('textarea')[0].value
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
        <textarea
          tabIndex={0}
          ref={register}
          name={name}
          {...rest}
          rows={rows}
          cols={cols}
        />
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
        <textarea
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

InputTextArea.propTypes = {};

export default InputTextArea;
