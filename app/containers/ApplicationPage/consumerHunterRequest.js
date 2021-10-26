// import _ from 'lodash';
import moment from 'moment';

export const consumerHunterRequest = payload => {
  const { cuid, appid, firstName, dob } = payload;
  return {
    requestXml: {
      product: 'CNS',
      applicationDate: moment().format('DD-MM-YYYY'),
      consumerId: cuid,
      applicationId: appid,
      loanAmount: '44800',
    },
    batchXml: {
      identifier: cuid,
      productCode: 'PL_I_NR',
      classification: 'REFERRED',
      applicationDate: moment().format('DD-MM-YYYY'),
      submissionDate: moment().format('DD-MM-YYYY'),
      applicant: {
        firstName,
        dob: moment(dob, ['DD-MM-YYYY', 'DD/MM/YYYY']).format('DD-MM-YYYY'),
      },
    },
    source: 'backend',
  };
};
