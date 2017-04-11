import styled from 'styled-components';

export default styled.img`
  display: ${({ isLoading }) => (isLoading ? 'none' : 'inline-block')};
  height: 100%;
  width: 100%;
`;
