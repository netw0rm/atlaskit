import styled from 'styled-components';

import { spacing } from './vars';

const getColumnWidth = props => (props.medium > 0 ? (`calc(100% / ${props.theme.columns} * ${props.medium} - ${spacing[props.theme.spacing]}px);`) : 0);

const GridColumn = styled.div`
  flex: 1 0 auto;
  flex-basis: ${getColumnWidth}
  margin: 0 ${props => (spacing[props.theme.spacing] / 2)}px;
  max-width: calc(100% / ${props => props.theme.columns} * ${props => (props.medium ? props.medium : props.theme.columns)} - ${props => (spacing[props.theme.spacing])}px);
  min-width: calc(100% / ${props => props.theme.columns} - ${props => (spacing[props.theme.spacing])}px);
  word-wrap: break-word;
`;


export default GridColumn;
export { getColumnWidth };
