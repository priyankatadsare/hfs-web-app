/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const SHOW_WAITING_MODAL = 'boilerplate/App/SHOW_WAITING_MODAL';
export const HIDE_WAITING_MODAL = 'boilerplate/App/HIDE_WAITING_MODAL';
export const LOG_OUT = 'boilerplate/App/LOG_OUT';

export const TOGGLE_SERVER_ERROR_MODAL =
  'boilerplate/App/TOGGLE_SERVER_ERROR_MODAL';
export const TOGGLE_COMMON_ERROR_MODAL =
  'boilerplate/App/TOGGLE_COMMON_ERROR_MODAL';

export const API_URL = 'https://api-test.clix.capital';
export const API_WRAPPER_URL = 'https://ms-uat.clix.capital';
export const DELPHI_API_URL = `https://prd-tech.clix.capital`;
export const EMAIL_NOTIFICATION_API_URL =
  'https://ms-uat.clix.capital/notification/v2/email';
export const MOBILE_NOTIFICATION_API_URL =
  'https://ms-uat.clix.capital/notification/v1/mobile';
export const MY_ACCOUNT_API_URL = `${API_URL}`;
export const RLA_PORTAL_URL = `https://master.d3ei59hwqrxfxx.amplifyapp.com`;
export const SOA_API_URL = `${API_URL}`;
export const RPS_API_URL = `${API_URL}`;
export const USER_SERVICE_API_URL = `${API_URL}/userservice/v2/users`;
export const OTP_API_URL = `${API_URL}/otp/v1`;
export const APP_SERVICE_API_URL = `${API_URL}/loanapplication/v2/apps`;
export const LEAD_API_URL = `${API_URL}/customerleadservice/v1/lead`;
export const MASTER_API_URL = `${API_URL}/master/v1`;
export const NSDL_API_URL = `${API_URL}/multibureau/nsdl/v1`;
export const COMPOSITE_APP_API_URL = `${API_URL}/profiles/update/details`;
export const PINCODE_API_URL = `${API_URL}/master/v1/zipcode`;
export const SCD_API_URL = `${API_URL}/scd`;
export const BANK_MASTER_API_URL = `${API_URL}/bank-master/v1`;
export const APP_DOCS_V2_API_URL = `${API_URL}/app-docs/v2`;
export const STATEMENT_ANALYZER_API_URL = `${API_URL}/sa/v2`;
export const APPLICATION_DOCUMENT_SERVICE = `${API_URL}/app-docs/v2`;
export const COMMERCIAL_BUREAU_API_URL = `${API_URL}/mbs/v1/score/commercial`;
export const MAKER_CHECKER_API_URL = `${API_URL}/makerChecker/v1`;
export const HUNTER_API_URL = `${API_URL}/hunter/v1`;
export const GST_API_URL = `${API_URL}/gst/v1/list`;
//--------------------------------------------------------
// ---------------------------------REGEX-PATTERNS-SATRTS-----------------------
//--------------------------------------------------------

export const EMPLOYEE_NAME_PATTERN = /^[A-Z ]*$/i;
export const SALARY_PATTERN = /^[\d,]*$/;
// export const MOBILE_PATTERN = /[6-9][0-9]{9}/;
export const MOBILE_PATTERN = /[6-9][0-9]{9}/i;
export const EMAIL_PATTERN_2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
export const EMIAL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const DOB_PATTERN = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
export const NUMBER_PATTERN = /^[0-9]*$/;
export const DECIMAL_PATTERN = /^\d+(\.\d{1,2})?$/;
//--------------------------------------------------------
// ---------------------------------REGEX-PATTERNS-ENDS-----------------------
//--------------------------------------------------------

// MASTERDATA MAPPING
export const MasterNames = {
  MANUFACTURER: 'MANUFACTURE_HFS',
  ASSET_CONDITION: 'ASSET_CONDITION_HFSAPP_HFS',
  ASSET_TYPE: 'HFS_ASSET_TPE_CATEGORY',
  TENURE: 'LOANTENURE_HFSAPP_HFS',
  EQUIPMENT: 'EQUIPEMENT_HFS',
  BORROWER_TYPE: 'BORROWERTYPE_HFSAPP_HFS',
  QUALIFICATION: 'QUALIFICATION_HFSAPP_HFS',
  OWNERSHIP_TYPE: 'OWNERSHIP_HFSAPP_HFS',
  ADDRESS_TYPE: 'ADDRESS_TYPE_HFSAPP_HFS',
  BUSINESS_PROFILE: 'COMPANYCATEGORY_HFSAPP_HFS',
  BUSINESS_TYPE: 'BUSINESSTYPE_HFSAPP_HFS',
  CONSTITUTION: 'CONSTITUTION_HFSAPP_HFS',
  PROGRAM_TYPE: 'PROG_TYPE_HFSAPP_HFS',
  DOCUMENTS: 'DOCUMENTS_HFSAPP_HFS',
  // DOCUMENTS: 'OTHERDOCS_HFSAPP_HFS',
  SUPPLIER: 'SUPPLIER_HFS',
};

export const UIStages = {
  NEW_APPLICATION: 'NEW_APPLICATION',
  USER_CONSENT_PENDING: 'USER_CONSENT_PENDING',
  USER_CONSENT_GRANTED: 'USER_CONSENT_GRANTED',
  LOAN_DETAILS: 'LOAN_DETAILS',
  BORROWER_DETAILS: 'BORROWER_DETAILS',
  ENTITY_DETAILS: 'ENTITY_DETAILS',
  ASK_GUARANTOR: 'ASK_GUARANTOR',
  GUARANTOR_DETAILS: 'GUARANTOR_DETAILS',
  PREVIEW_APPLICATION: 'PREVIEW_APPLICATION',
  BANK_STATEMENT_UPLOAD: 'BANK_STATEMENT_UPLOAD',
  BANK_STATEMENT_ANALYSIS: 'BANK_STATEMENT_ANALYSIS',
  LOAN_OFFERS: 'LOAN_OFFERS',
  LOAN_DOCUMENT_UPLOAD: 'LOAN_DOCUMENT_UPLOAD',
  APPLICATION_IN_CREDIT: 'CREDIT_SUBMISSION',
};

export const STATE_GSTS = {
  '01': 'JAMMU AND KASHMIR',
  '02': 'HIMACHAL PRADESH',
  '03': 'PUNJAB',
  '04': 'CHANDIGARH',
  '05': 'UTTARANCHAL',
  '06': 'HARYANA',
  '07': 'DELHI',
  '08': 'RAJASTHAN',
  '09': 'UTTAR PRADESH',
  '10': 'BIHAR',
  '11': 'SIKKIM',
  '12': 'ARUNACHAL PRADESH',
  '13': 'NAGALAND',
  '14': 'MANIPUR',
  '15': 'MIZORAM',
  '16': 'TRIPURA',
  '17': 'MEGHLAYA',
  '18': 'ASSAM',
  '19': 'WEST BENGAL',
  '20': 'JHARKHAND',
  '21': 'ODISHA',
  '22': 'CHhATTISGARH',
  '23': 'MADHYA PRADESH',
  '24': 'GUJARAT',
  '26': 'DAMAN AND DIU',
  '27': 'MAHARASHTRA',
  '28': 'ANDHRA PRADESH',
  '29': 'KARNATAKA',
  '30': 'GOA',
  '31': 'LAKSHWADEEP',
  '32': 'KERALA',
  '33': 'TAMIL NADU',
  '34': 'PONDICHERRY',
  '35': 'ANDAMAN AND NICOBAR ISLANDS',
  '36': 'TELANGANA',
};

export const DESIGNATION = [
  'Management trainer',
  'Officer',
  'Senior officer',
  'Executive',
  'Senior executive',
  'Associate',
  'Senior associate',
  'Assistant manager',
  'Deputy manager',
  'Manager',
  'Senior manager',
  'Deputy general manager',
  'General manager',
  'Assistant Vice President',
  'Deputy Vice President',
  'Vice President',
  'Senior Vice President',
  'President',
  'Senior president',
  'CEO',
  'COO',
  'CXO',
  'Director',
  'Chairman',
  'Vice chairman',
  'Founder',
  'Managing director',
  'Others',
];
