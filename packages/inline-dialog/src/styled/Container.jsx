import styled from 'styled-components';
import {
  akBorderRadius as borderRadius,
  akGridSizeUnitless as spacing,
} from '@atlaskit/util-shared-styles';
import theme from './theme';

export default styled.div`
  background: ${theme.light.background};
  border-radius: ${borderRadius};
  box-shadow: 0 0 1px ${theme.light.border},  0 4px 8px -2px ${theme.light.shadow};
  box-sizing: border-box;
  color: ${theme.light.text};
  max-height: ${spacing * 60}px;
  max-width: ${spacing * 62}px;
  padding: ${spacing * 3}px;
  z-index: 200;
`;
