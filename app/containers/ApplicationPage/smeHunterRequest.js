// import _ from 'lodash';
import moment from 'moment';

export const smeHunterRequest = payload => {
  const { cuid, appid, registeredName } = payload;
  return {
    requestXml: {
      product: 'SME',
      applicationDate: moment().format('DD-MM-YYYY'),
      consumerId: cuid,
      applicationId: appid,
      loanAmount: '75000000',
    },
    batchXml: {
      identifier: cuid,
      productCode: 'LAEP_NI_NR',
      classification: 'REFERRED',
      applicationDate: moment().format('DD-MM-YYYY'),
      submissionDate: moment().format('DD-MM-YYYY'),
      companyDetails: [
        {
          organisationName: registeredName,
        },
      ],
    },
    source: 'Postman',
  };
};
