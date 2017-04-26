import { akColorN300, akColorN0 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { appearanceEnum, themeVariables } from '../../utils/theme';

const colors = {
  global: akColorN0,
  settings: akColorN0,
  container: akColorN300,
};

const ContainerTitleSubText = styled.div`
  color: ${({ theme }) => colors[theme[themeVariables.appearance]]};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ContainerTitleSubText.defaultProps = {
  theme: {
    [themeVariables.appearance]: appearanceEnum.container,
  },
};

ContainerTitleSubText.displayName = 'ContainerTitleSubText';
export default ContainerTitleSubText;
