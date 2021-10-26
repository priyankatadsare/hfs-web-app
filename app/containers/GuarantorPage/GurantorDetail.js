import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function GurantorDetail({
  gurantor,
  setcurentGurantor,
  formRef,
  index,
  appDetails,
}) {
  const {
    firstName = '',
    middleName = '',
    lastName = '',
    preferredEmail,
    preferredPhone,
    contactibilities = [],
  } = gurantor;

  const isPromoter = _.get(gurantor, 'appLMS.role') === 'PROMOTER';
  const [addressesFilled, setAddressesFilled] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(gurantor)) {
      const existingCurrentAddress =
        _.find(contactibilities, {
          contactType: 'CURRENT',
        }) || false;

      const existingPermanentAddress =
        _.find(contactibilities, {
          contactType: 'PERMANENT',
        }) || false;

      if (existingCurrentAddress && existingPermanentAddress)
        setAddressesFilled(true);
      else setAddressesFilled(false);
    }
  }, [gurantor, appDetails]);

  const handleClick = e => {
    e.preventDefault();
    setcurentGurantor(gurantor);
    setTimeout(() => {
      formRef.current.scrollIntoView();
    }, 1000);
  };

  return (
    <>
      <div className="d-flex">
        <a onClick={handleClick}>
          <h4>{`Guarantor ${index}`} &nbsp; &#9998;</h4>
        </a>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Name</div>
          <div className="value">{`${firstName} ${middleName} ${lastName}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Mobile</div>
          <div className="value">{`+91 ${preferredPhone}`}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">E-mail ID</div>
          <div className="value">{preferredEmail}</div>
        </div>
        {isPromoter && (
          <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
            <div className="name">Role</div>
            <div className="value">PROMOTER</div>
          </div>
        )}
      </div>
      {contactibilities.length ? (
        <div className="d-flex">
          <h4>Address Details</h4>
        </div>
      ) : null}

      {contactibilities.map(
        ({
          addressLine1,
          addressLine2,
          addressLine3,
          locality,
          city,
          pincode,
          state,
          contactType,
          durationOfStayInMonths,
        }) => (
          <>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">{contactType}</div>
                <div className="value">{`${addressLine1} ${addressLine2} ${addressLine3}`}</div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Locality</div>
                <div className="value">{`${locality} ${city} ${state} ${pincode}`}</div>
              </div>
              <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
                <div className="name">Duration</div>
                <div className="value">{durationOfStayInMonths}</div>
              </div>
            </div>
          </>
        ),
      )}
      <div className="warning mt-4 mb-4">
        {!addressesFilled &&
          'One Current and One Permanent Address is mandatory for a Gurantor'}
      </div>
    </>
  );
}

export default GurantorDetail;
