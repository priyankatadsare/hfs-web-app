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

export const commercialBureauRequest = applicant => {
  const { cuid } = applicant;
  const contactibility =
    _.find(applicant.contactibilities, function(o) {
      return o.pincode && o.state && o.city;
    }) || {};
  const { pincode, city, state } = contactibility;
  const gender = _.get(applicant, 'userDetails.gender');
  return {
    cuid: '1233667',
    applicantSegment: {
      applicationSegment: {
        credtInqPurpsTypDesc: 'Cash credit',
        relCustomerId: 'CNSTest9',
        kendraId: 'Pune',
        branchId: 'Pune',
        branchState: 'MAHARASHTRA',
        ifscCode: 'IFSC679',
        applicationId: 'COMBATTEST0209190000100',
        borrowerId: 'COMBATTEST0209190000100',
        creditType: 'Letters of credit',
        creditAmount: 1000000,
        accountNumber: 'NJK88NNNM50000',
      },
      commApplicantSegment: {
        dateOfRegistration: '2018-01-01',
        borrowerName: 'ANKUR DRUGS AND PHARMA LTD',
        borrowerShortName: 'ANKUR DRUGS',
        legalConstitution: 'PRIVATE LIMITED',
        ids: [
          {
            type: 'PAN',
            value: 'AACCA2062M',
          },
        ],
        classOfActivity1: 'WOOLEN TEXTILE',
        businessUnit: '',
        circle: '',
        phones: {
          phones: [
            {
              type: 'MOBILE',
              value: '9936789321',
            },
          ],
        },
        emailId: 'test@gmail.com',
        fax1: 'HJGHJ7897KJHJH',
        fax2: 'HJGHJ7897KJHJH',
        fax3: 'HJGHJ7897KJHJH',
      },
      commAddressSegment: {
        addresses: [
          {
            type: 'REGISTERED OFFICE',
            addressLine: 'C-306,CRYSTAL PLAZA,ANDHERI LINK ROAD3',
            locality: 'INDORE',
            city: 'INDORE',
            state: 'Madhya Pradesh',
            pin: '452011',
            duns: '',
          },
        ],
      },
      individualEntitiesSegment: {
        individualEntity: {
          individualEntityType: 'Promoter Director',
          indvApplicantSegment: {
            din: 'DIN1234',
            applicantName: {
              name1: 'Director Name',
              name2: 'Director Name',
              name3: 'Director Name',
              name4: 'Director Name',
              name5: null,
            },
            dob: {
              dobDate: '2018-01-01',
              age: '2018-01-01',
              ageAsOn: '2',
            },
            ids: [
              {
                type: 'PAN',
                value: 'AACCA2062M',
              },
            ],
            relations: {
              relations: [
                {
                  type: '',
                  value: '',
                },
              ],
            },
            phones: {
              phones: [
                {
                  type: 'MOBILE',
                  value: '9936789321',
                },
              ],
            },
            email1: 'test@gmail.com',
            email2: '',
            email3: '',
            gender: 'Male',
            maritalStatus: 'Married',
          },
          indvAddressSegment: {
            addresses: [
              {
                type: 'REGISTERED OFFICE',
                addressLine: 'C-306,CRYSTAL PLAZA,ANDHERI LINK ROAD3',
                locality: 'INDORE',
                city: 'INDORE',
                state: 'Madhya Pradesh',
                pin: '452011',
                duns: '',
              },
            ],
          },
        },
      },
      organisationEntitiesSegment: {
        organisationEntities: {
          organisationEntityType: 'Organisation',
          organisationApplicantSegment: {
            organisationName: 'name of Org',
            organisationShortName: 'Org short name',
            legalConstitution: 'Private Limited',
            ids: [
              {
                type: 'PAN',
                value: 'AACCA2062M',
              },
            ],
            classOfActivity1: 'GROWING OF MEDICINAL PLANTS',
            classOfActivity2: '',
            classOfActivity3: '',
            businessUnit: 'Business Unit',
            circle: 'Circle',
            phones: {
              phones: [
                {
                  type: 'MOBILE',
                  value: '9936789321',
                },
              ],
            },
          },
          organisationAddressSegment: {
            addresses: [
              {
                type: 'REGISTERED OFFICE',
                addressLine: 'C-306,CRYSTAL PLAZA,ANDHERI LINK ROAD3',
                locality: 'INDORE',
                city: 'INDORE',
                state: 'Madhya Pradesh',
                pin: '452011',
                duns: '',
              },
            ],
          },
        },
      },
    },
  };
};
