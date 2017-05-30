import { akColorN10 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import FloatingToolbarDefault from '../FloatingToolbar';
import ToolbarButtonDefault from '../ToolbarButton';

// tslint:disable-next-line:variable-name
export const FloatingToolbar: any = styled(FloatingToolbarDefault)`
  background-color: transparent;
  > div {
    background-color: ${akColorN10};
    display: flex;
    alignItems: center;
    padding: 4px 8px;
    button {
      margin-left: 5px;
      > span {
        padding: 4px;
      }
    }
  }
`;

// tslint:disable-next-line:variable-name
export const ToolbarButton: any = styled(ToolbarButtonDefault)`
  button {
    padding: 4px;
    margin-left: 5px;
  }
`;
