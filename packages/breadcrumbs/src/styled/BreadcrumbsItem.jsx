import styled from 'styled-components';
import { gridSize, fontSize } from '@atlaskit/theme';

const height = (gridSize() * 3) / parseInt(fontSize(), 10);

const BreadcrumbsItemElement = styled.div`
  display: flex;
  flex-direction: row;
  height: ${height}em;
  line-height: ${height}em;
  margin: 0 ${gridSize() / 2}px;
`;

BreadcrumbsItemElement.displayName = 'BreadcrumbsItemElement';

export default BreadcrumbsItemElement;
