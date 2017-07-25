import styled from 'styled-components';
import { akColorN100A, akColorN800, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const ThemeColor = {
  text: {
    default: akColorN800,
    disabled: akColorN100A,
  },
};

const Content = styled.div`
  color: ${p => (p.isDisabled ? ThemeColor.text.disabled : ThemeColor.text.default)};
  margin-top: ${akGridSizeUnitless / 2}px;
`;

// While we are only exporting one style, we want to keep the same export shape.
// eslint-disable-next-line
export { Content };
