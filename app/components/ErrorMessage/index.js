import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

let config = {
  // min: 'Minimum loan Amount is 10,000',
  // max: 'Maximum loan Amount is 5,50,000',
  required: 'Required',
  ampersand: 'Cannot contain ampersand(&)',
  pattern: 'Pattern is not valid',
  onlyAlphabets: 'Only alpha Required',
  invalidCreditCard: 'Is invalid credit card number',
  invalidEmailAddress: 'Invalid email address',
  invalidPassword:
    'Invalid password. Password must be at least 6 characters long, and contain a number.',
  pin: 'Invalid Pin',
  invalidAadhar: 'Invalid Aadhar',
  onlyNumber: 'Only Number Required',
  mobileNumber: 'Invalid Mobile.',
  indianMobileNumber:
    'Number should start with 6,7,8 or 9 & should be of length 10',
  panNumber: 'Invalid Pan Number',
  validate: 'Already used',
  //minlength: `Minimum length ${validatorValue.requiredLength}`,
  minlength: `Minimum length 10 is required`,
  //maxLength: "Max length" + ` ${validatorValue.requiredLength}`,
  maxLength: 'Max length' + ` 10 is allowed`,
  invalidRange: 'Out Of Range',
  // loanRange: CONFIG.LOAN_RANGE_TEXT + "",
  // interimLoanRange: "Allowed range 1,00,000 to " + `${validatorValue}`,
  //   loanRangeWrtReqAmt:
  //     "The loan amount should be within the range of 1,00,000 to " +
  //     `${validatorValue}`,
  invalidAgeRange: 'Age should be between 25 to 58',
  invalidAgeRangeInsurance: 'Age should be between 25 to 55',
  adultsOnly: 'Age should be atleast 18',
  invalidDateFormat: 'Invalid date format',
  inValidifscCode: 'Please enter valid IFSC code',
  inValidbankAccountNumber: 'Please enter calid Account number',
  invalidPinCode: 'Service not available for this pincode.',
  specialChars: 'Special characters not allowed',
  onlyLettersOrDot: 'Only letters or dot allowed',
  emailChars: 'Please provide a valid email address',
  addressLine: 'Please remove these charcters: \', ", <, >, &',
  percentageRange: 'Please enter % between 0 - 100',
  mobileShouldBeDifferent:
    'Customer & Sales Person mobile no. should be different',
  sameMobileNumber: 'Alternate no. should be different than Mobile no.',
  sameOfficeAndPersonalEmail:
    'Personal email & Office email should be different',
  whitespace: 'No whitespace allowed',
};

export default function ErrorMessage({ name, errors }) {
  // console.log(`Args from error component ${name}  and error =>`, errors);
  return (
    <>
      {name && errors[name] && (
        <span
          className="errorMsg control-note"
          style={{ color: 'red', display: 'flex' }}
        >
          {_.get(errors, name).message
            ? _.get(errors, name).message
            : config[_.get(errors, name).type]}
        </span>
      )}
    </>
  );
}

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
};
