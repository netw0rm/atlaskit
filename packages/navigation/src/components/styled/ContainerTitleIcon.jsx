import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const size = akGridSizeUnitless * 5;
const borderRadius = 4;

const ContainerTitleIcon = styled.div`
  width: ${size}px;
  height: ${size}px;

  & > * {
    width: ${size}px;
    height: ${size}px;
    border-radius: ${borderRadius}px;
  }
`;

ContainerTitleIcon.displayName = 'ContainerTitleIcon';
export default ContainerTitleIcon;
