import styled from 'styled-components';

export default styled.div`
  line-height: unset !important;
  min-width: 120px;
  max-width: 120px;
  height: auto !important;
  @media (min-width: 320px) and (max-width: 1400px) {
    max-width: unset;
  }
`;
