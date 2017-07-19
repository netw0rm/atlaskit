import styled from 'styled-components';
import { iconHorizontalPadding } from './constants';

export const Wrapper = styled.span`
  padding: 0 ${iconHorizontalPadding}px;
  position: relative;
`;

export const Label = styled.label`
  display: block;
`;

export const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;
