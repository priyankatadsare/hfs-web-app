import _ from 'lodash';
import { revertFormatDate } from 'utils/helpers';
import moment from 'moment';

const stateMapping = {
  'Andhra Pradesh': 'AP',
  Assam: 'ASSAM',
  Bihar: 'BIHAR',
  Chhattisgarh: 'CHHATTISGARH',
  Chandigarh: 'CHNDGRH',
  'Daman and Diu': 'DAMAN AND DIU',
  Delhi: 'DELHI',
  Gujarat: 'GUJARAT',
  Haryana: 'HARAYANA',
  'Himachal Pradesh': 'HIMACHALPRADESH',
  'Jammu and Kashmir': 'JAMMUANDKASHMIR',
  Jharkhand: 'JHARKHAND',
  Karnataka: 'KARNATAKA',
  Kerala: 'KERALA',
  Maharashtra: 'MAHARASHTRA',
  Manipur: 'MANIPUR',
  Mizoram: 'MIZORAM',
  'Madhya Pradesh': 'MP',
  Odisha: 'ODISHA',
  Pondicherry: 'PUDUCHERRY',
  Punjab: 'PUNJAB',
  Rajasthan: 'RAJASTHAN',
  'Tamil Nadu': 'TAMILNADU',
  Telangana: 'TELANGANA',
  Tripura: 'TRIPURA',
  USA: 'USA',
  Uttaranchal: 'UTTARAKHAND',
  'Uttar Pradesh': 'UTTARPRADESH',
  'West Bengal': 'WESTBENGAL',
};

export const bureauRequest = applicant => {
  const contactibility =
    _.find(applicant.contactibilities, function(o) {
      return o.pincode && o.state && o.city;
    }) || {};
  const { pincode, city, state } = contactibility;
  const gender = _.get(applicant, 'userDetails.gender');
  return {
    applicantSegment: {
      applicantName: {
        name1: applicant.firstName || '',
        name3: applicant.lastName,
      },
      dob: {
        dobDate: applicant.dateOfBirthIncorporation,
      },
      gender,
      ids: [{ type: 'PAN', value: applicant.userIdentities.pan }],
      addresses: [
        {
          type: 'Residence',
          address1: `${_.get(
            applicant,
            'contactibilities[0].addressLine1',
          )} ${_.get(applicant, 'contactibilities[0].addressLine2')}`,
          city,
          state: stateMapping[state] || state,
          pincode,
        },
      ],
      entityId: 'eNTITY23',
      phones: [
        {
          type: 'MOBILE',
          value: applicant.preferredPhone,
        },
      ],
      emails: [
        {
          value: applicant.preferredEmail,
        },
      ],
    },
    cuid: applicant.cuid,
    applicationSegment: {
      loanType: 'PB STOCK',
      consumerId: applicant.cuid,
      applicationId: applicant.appidFk,
      applicationDate: revertFormatDate(moment(), 'DD-MM-YYYY'),
      loanAmount: 1,
    },
  };
};
