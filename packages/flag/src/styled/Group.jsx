import styled from 'styled-components';
import { akGridSizeUnitless, akZIndexFlag } from '@atlaskit/util-shared-styles';

export const getBottomOffset = ({ hasSingleFlag }) => (
  akGridSizeUnitless * (hasSingleFlag ? 4 : 6)
);

export default styled.div`
  bottom: ${getBottomOffset}px;
  left: ${akGridSizeUnitless * 10}px;
  position: fixed;
  transition: bottom 0.25s;
  z-index: ${akZIndexFlag};
`;

export const SROnly = styled.h1`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Inner = styled.div`
  position: relative;
`;
