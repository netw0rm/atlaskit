import styled from 'styled-components';
import { akGridSizeUnitless, akZIndexModal } from '@atlaskit/util-shared-styles';
import { WIDTH_ENUM } from '../shared-variables';

const viewportMargin = akGridSizeUnitless * 7.5;
const doubleViewportMargin = viewportMargin * 2;

const getWidth = ({ width }) => WIDTH_ENUM.widths[width];

// have to use height because of IE11 bug
// The -1px in max-height is needed for IE11/Edge.
export default styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - ${doubleViewportMargin}px);
  margin: 0 auto;
  margin-top: ${viewportMargin}px;
  max-height: calc(100% - 1px);
  max-width: calc(100% - ${doubleViewportMargin}px);
  position: relative;
  width: ${getWidth}px;
  z-index: ${akZIndexModal};
`;
