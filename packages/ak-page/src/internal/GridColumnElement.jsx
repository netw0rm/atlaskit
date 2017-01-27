import styled from 'styled-components';

import { spacing } from './vars';

const getColumnWidth = props => (props.medium > 0 ? (`calc(100% / ${props.theme.columns} * ${props.medium} - ${spacing[props.theme.spacing]}px)`) : 0);
const availableColumns = props => props.theme.columns;
const specifiedColumns = props => (props.medium ? props.medium : availableColumns(props));
const columns = props => Math.min(availableColumns(props), specifiedColumns(props));
const gridSpacing = props => (spacing[props.theme.spacing]);

const GridColumn = styled.div`
  flex: 1 0 ${getColumnWidth};
  margin: 0 ${props => (spacing[props.theme.spacing] / 2)}px;
  max-width: calc(100% / ${availableColumns} * ${columns} - ${gridSpacing}px);
  min-width: calc(100% / ${availableColumns} - ${gridSpacing}px);
  word-wrap: break-word;
`;

export default GridColumn;
export { getColumnWidth };
