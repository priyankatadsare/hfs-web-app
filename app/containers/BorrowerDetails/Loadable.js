/**
 *
 * Asynchronously loads the component for BorrowerDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
