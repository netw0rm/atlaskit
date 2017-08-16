import { akColorN10, akColorN400 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import ToolbarButtonDefault from '../ToolbarButton';
import FloatingToolbarDefault from '../FloatingToolbar';

// tslint:disable-next-line:variable-name
export const FloatingToolbar: any = styled(FloatingToolbarDefault)`
  background-color: ${akColorN10};
  padding: 4px 8px;
`;

// tslint:disable-next-line:variable-name
export const ToolbarButton: any = styled(ToolbarButtonDefault)`
  > span {
    padding: 6px;
  }
`;

// tslint:disable-next-line:variable-name
export const Seperator = styled.span`
  background: ${akColorN400};
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0 4px;
`;
