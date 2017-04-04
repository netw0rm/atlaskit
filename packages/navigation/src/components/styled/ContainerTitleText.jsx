import {
  akColorN500,
  akColorN0,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const colors = {
  global: akColorN0,
  settings: akColorN0,
  container: akColorN500,
};

const ContainerTitleText = styled.div`
  color: ${({ theme }) => colors[theme.NavigationAppearance]};
  font-weight: 500;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ContainerTitleText.defaultProps = {
  theme: {
    NavigationAppearance: 'container',
  },
};

export default ContainerTitleText;
