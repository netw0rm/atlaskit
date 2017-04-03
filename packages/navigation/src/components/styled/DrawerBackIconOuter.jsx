import {
  akColorN20,
  akColorN500,
  akColorB50,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';

export default styled.div`
  background: ${akColorN20};
  border-radius: 50%;
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  height: ${drawerBackIconSize};
  justify-content: center;
  width: ${drawerBackIconSize};

  &:active {
    background: ${akColorB50};
    color: ${akColorB400};
  }
`;
