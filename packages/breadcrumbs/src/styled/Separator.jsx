import styled from 'styled-components';
import { akColorN100, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const ThemeColor = {
  text: akColorN100,
};

const Separator = styled.div`
  color: ${ThemeColor.text};
  padding-left: ${akGridSizeUnitless}px;
  text-align: center;
  width: ${akGridSizeUnitless}px;
`;

Separator.displayName = 'Separator';

export default Separator;
