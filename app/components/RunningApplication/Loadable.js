/**
 *
 * Asynchronously loads the component for RunningApplication
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
