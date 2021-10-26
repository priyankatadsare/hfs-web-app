/**
 *
 * Asynchronously loads the component for BankDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
