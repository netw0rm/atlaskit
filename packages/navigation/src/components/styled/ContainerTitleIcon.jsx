import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const size = akGridSizeUnitless * 5;

const ContainerTitleIcon = styled.div`
  width: ${size}px;
  height: ${size}px;

  & > * {
    width: ${size}px;
    height: ${size}px;
    border-radius: 4px;
  }
`;

ContainerTitleIcon.displayName = ContainerTitleIcon;
export default ContainerTitleIcon;
