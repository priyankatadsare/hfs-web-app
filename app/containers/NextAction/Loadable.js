/**
 *
 * Asynchronously loads the component for NextAction
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
