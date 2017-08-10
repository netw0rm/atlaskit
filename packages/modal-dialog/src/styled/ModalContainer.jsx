import styled from 'styled-components';
import { akColorN0, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const getHeight = ({ height }) => {
  if (typeof height === 'number') {
    return `${height}px`;
  } else if (typeof height === 'string') {
    return height;
  }
  return 'auto';
};

export default styled.div`
  background-color: ${akColorN0};
  border-radius: ${akGridSizeUnitless / 2}px;
  display: flex;
  flex-direction: column;
  height: ${getHeight};
  max-height: 100%;
`;
