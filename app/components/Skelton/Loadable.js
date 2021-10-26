/**
 *
 * Asynchronously loads the component for Skelton
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
