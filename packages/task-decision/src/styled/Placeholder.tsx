import styled from 'styled-components';
import {
  akGridSizeUnitless,
  akColorN80,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Placeholder = styled.span`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
  position: absolute;
  color: ${akColorN80};
  pointer-events: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 50px);
`;
