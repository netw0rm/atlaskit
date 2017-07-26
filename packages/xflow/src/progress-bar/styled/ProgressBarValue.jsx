import styled from 'styled-components';

const ProgressBarValue = styled.div`
  background: #162b4d;
  height: 6px;
  width: 50%;
  border-radius: 3px;
  transition: width 5s linear;
`;

ProgressBarValue.displayName = 'ProgressBarValue';
export default ProgressBarValue;
