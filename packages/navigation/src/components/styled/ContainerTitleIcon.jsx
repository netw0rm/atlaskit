import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const size = akGridSizeUnitless * 5;
const borderRadius = 4;

const ContainerTitleIcon = styled.div`
  width: ${size}px;
  height: ${size}px;

  /* We need to ensure that any image passed in as a child (<img/>, <svg/>
  etc.) receives the correct width, height and border radius. We don't
  currently assume that the image passed in is the correct dimensions, or has
  width / height 100% */
  & > * {
    width: ${size}px;
    height: ${size}px;
    border-radius: ${borderRadius}px;
  }
`;

ContainerTitleIcon.displayName = 'ContainerTitleIcon';
export default ContainerTitleIcon;
