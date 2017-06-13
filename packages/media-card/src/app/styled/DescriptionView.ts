/* tslint:disable:variable-name */
import styled from 'styled-components';

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  padding: 0 16px 12px 16px;
  line-height: 16px;
`;
