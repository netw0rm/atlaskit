import styled from 'styled-components';
import { colorInvalid, innerHeight } from './constants';

const WarningIcon = styled.div`
  align-items: center;
  color: ${colorInvalid};
  display: flex;
  height: ${innerHeight}px;
`;

export default WarningIcon;
