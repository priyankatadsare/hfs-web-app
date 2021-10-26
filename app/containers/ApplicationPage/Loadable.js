/**
 *
 * Asynchronously loads the component for ApplicationPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
