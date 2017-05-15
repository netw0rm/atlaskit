import styled from 'styled-components';

// if image is loading, we hide the image so it doesn't obscure the gray loading block
// until the source image is loaded.
const getDisplay = ({ isLoading }) => (isLoading ? 'none' : 'inline-block');

export default styled.img`
  display: ${getDisplay};
  height: 100%;
  width: 100%;
`;
