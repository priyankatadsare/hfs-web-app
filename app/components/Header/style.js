import styled from 'styled-components';
const Wrapper = styled.header`
  display: flex;
  align-items: center;
  .image {
    padding: 0 15px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  img {
    width: 116px;
  }
  @media (min-width: 1200px) {
    .image {
      max-width: 1200px;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    .image {
      max-width: 960px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .image {
      max-width: 720px;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    .image {
      max-width: 540px;
    }
  }
`;

export default Wrapper;
