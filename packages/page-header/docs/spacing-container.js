import styled from 'styled-components';

const SpacingContainer = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

export default SpacingContainer;
