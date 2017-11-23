import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';

export default styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 740px;
  padding-left: ${math.multiply(gridSize, 2)}px;
  padding-right: ${math.multiply(gridSize, 2)}px;

  @media (min-width: 780px) {
    padding-left: ${math.multiply(gridSize, 3)}px;
    padding-right: ${math.multiply(gridSize, 3)}px;
  }
`;
