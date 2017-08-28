import styled from 'styled-components';
import { colors, gridSize, themed } from '@atlaskit/theme';

const shadow1 = themed({ light: colors.N50A, dark: colors.DN50A });
const shadow2 = themed({ light: colors.N60A, dark: colors.DN60A });

const ButtonWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: ${(gridSize() / 2) - 1}px;
  box-shadow: 0 ${gridSize() / 2}px ${gridSize}px -${gridSize() / 4}px ${shadow1},
              0 0 1px ${shadow2};
  box-sizing: border-box;
  z-index: 200;

  &:last-child {
    margin-left: ${gridSize() / 2}px;
  }
`;

ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
