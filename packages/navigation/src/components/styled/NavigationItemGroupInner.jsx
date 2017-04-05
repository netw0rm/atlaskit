import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  margin-top: ${({ hasHeaderContent }) => (hasHeaderContent ? 0 : (akGridSizeUnitless * 3))}px;
  &:first-child {
    ${({ hasHeaderContent }) => (hasHeaderContent ? '' : `
        margin-top: 0;
    `)}
  }
`;
