/**
 *
 * Asynchronously loads the component for LoanApplications
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
