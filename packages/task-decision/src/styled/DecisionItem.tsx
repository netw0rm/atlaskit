import styled from 'styled-components';
import {
  akGridSize,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const EditorIconWrapper = styled.span`
  flex: 0 0 16px;
  height: 16px;
  width: 16px;
  color: ${props => props.color || 'inherit'}
  margin: 2px ${akGridSize} 0 0;

  > span {
    margin: -8px;
  }
`;
