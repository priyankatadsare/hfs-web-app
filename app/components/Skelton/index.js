/**
 *
 * Skelton
 *
 */

import React, { memo } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorMessage from 'components/ErrorMessage';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 400px;
`;

function Skelton({ loading, children, error }) {
  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <Wrapper>
          <LoadingIndicator />
        </Wrapper>
      )}
      <div style={loading ? { opacity: '0.5' } : {}}>{children}</div>
      {error ? <ErrorMessage error={error} /> : ''}
    </div>
  );
}
// }

Skelton.propTypes = {};

export default memo(Skelton);
