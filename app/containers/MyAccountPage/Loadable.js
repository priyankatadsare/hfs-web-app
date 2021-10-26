/**
 *
 * Asynchronously loads the component for MyAccountPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
