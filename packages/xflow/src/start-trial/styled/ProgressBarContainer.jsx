import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: grid;
  height: 24px;
  grid-template-columns: ${({ showIcon }) => (showIcon ? '1fr 32px' : '1fr')};
`;

ProgressBarContainer.displayName = 'ProgressBarContainer';
export default ProgressBarContainer;
