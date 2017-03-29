import {
  akGridSizeUnitless,
  akColorN400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  padding-bottom: ${akGridSizeUnitless * 0.5}px;

  a, button {
    text-decoration: none;

    &:hover {
      color: ${akColorN400};
      text-decoration: none;
    }
  }
`;
