import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const size = akGridSizeUnitless * 5;

export default styled.div`
  width: ${size}px;
  height: ${size}px;

  & > * {
    width: ${size}px;
    height: ${size}px;
    border-radius: 4px;
  }
`;
