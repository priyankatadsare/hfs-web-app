/*
 * ErrorMessage Messages
 *
 * This contains all the text for the ErrorMessage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ErrorMessage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ErrorMessage component!',
  },
});
