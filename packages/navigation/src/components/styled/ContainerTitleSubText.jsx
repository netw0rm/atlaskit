import { akColorN300, akColorN0 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const colors = {
  global: akColorN0,
  settings: akColorN0,
  container: akColorN300,
};

const ContainerTitleSubText = styled.div`
  color: ${({ theme }) => colors[theme.ContainerNavigationAppearance]};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ContainerTitleSubText.defaultProps = {
  theme: {
    ContainerNavigationAppearance: 'container',
  },
};

export default ContainerTitleSubText;
