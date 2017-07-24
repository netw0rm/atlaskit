import styled from 'styled-components';
import { fullWidth, fullHeight, height, innerHeight, innerWidth, width } from './constants';

const getLeft = p => ((p.isFocus ? fullWidth : width) - innerWidth) / 2;
const getTop = p => ((p.isFocus ? fullHeight : height) - innerHeight) / 2;

const RadioIconCheckedIndicator = styled.div`
  background-color: white;
  border-radius: 50%;
  display: block;
  height: ${innerHeight}px;
  left: ${getLeft}px;
  position: absolute;
  top: ${getTop}px;
  width: ${innerWidth}px;
`;

RadioIconCheckedIndicator.displayName = 'RadioIconCheckedIndicator';

export default RadioIconCheckedIndicator;
