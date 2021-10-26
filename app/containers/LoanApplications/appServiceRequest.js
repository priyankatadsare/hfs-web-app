// import moment from 'moment';
export default function({ app, leadId, cuid, lan, lmsSystem }) {
  const { product, loanPurpose } = app;
  const productMapping = {
    PERSONAL: 'PL',
    AUTOMOBILE: 'CL',
    LACR: 'LAEP',
    BUSINESSL: 'BL',
    CONSDUR: 'CD',
    BUSINESS: 'BL',
  };
  const {
    disbursmentAccHolderName = '',
    disbursmentAccNumber = '',
    disbursmentAccType = '',
    disbursmentBankIfsc = '',
    disbursmentBankName = '',
  } = app.bankDetail || {};

  const { umrn = '', emandateId = '', status = '' } = app.mandate || {};

  return {
    appSourcing: {
      channel: 'RLA',
    },
    bankDetail: {
      disbursmentAccHolderName,
      disbursmentAccNumber,
      disbursmentAccType,
      disbursmentBankIfsc,
      disbursmentBankName,
    },
    mandate: { umrn, emandateId: umrn, status: 'registered' },
    product: productMapping[product] || product,
    partner: 'RLA',
    loanPurpose,
    applicationStatus: '',
    customerLeadRefId: leadId,
    additionalData: {
      data: {
        existingLAN: lan,
        extraDataField: {
          existingLanLMS: lmsSystem,
        },
      },
    },
  };
}
