import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
  position: absolute;
`;

// tslint:disable-next-line:variable-name
export const EditorIconWrapper = styled.span`
  height: 32px;
  width: 32px;
  top: 2px;
  left: 0;
  position: absolute;
  color: ${props => props.color || 'inherit'}
`;
