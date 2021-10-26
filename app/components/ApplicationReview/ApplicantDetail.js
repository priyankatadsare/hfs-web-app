import React from 'react';
import _ from 'lodash';

function ApplicantDetail({ applicant, index, kind }) {
  const {
    firstName = '',
    type,
    middleName = '',
    lastName = '',
    preferredEmail,
    dateOfBirthIncorporation,
    userIdentities: { pan },
    preferredPhone,
    contactibilities = [],
  } = applicant;
  const isPromoter = _.get(applicant, 'appLMS.role') === 'PROMOTER';
  return (
    <>
      <div className="d-flex">
        <h4>{`${kind} ${index}`}</h4>
      </div>
      <div className="d-flex" />
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
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">Pan</div>
          <div className="value">{pan}</div>
        </div>
        <div className="disbursal-detail d-flex flex-row flex-md-column justify-content-md-start justify-content-between">
          <div className="name">{`Date of ${
            type === 'Individual' ? 'Birth' : 'Incorportaion'
          }`}</div>
          <div className="value">{dateOfBirthIncorporation}</div>
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
    </>
  );
}

export default ApplicantDetail;
