import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';

const ThemeColor = {
  text: akColorN300,
};

const BreadcrumbsContainer = styled.div`
  color: ${ThemeColor.text};
  display: flex;
  flex-wrap: wrap;
`;

BreadcrumbsContainer.displayName = 'BreadcrumbsContainer';

export default BreadcrumbsContainer;
