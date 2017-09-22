/* tslint:disable variable-name */
import styled from 'styled-components';
import {akFontFamily, akFontSizeDefault, akColorN0, akColorN30} from '@atlaskit/util-shared-styles';

const defaultMinWidth = 272;
const defaultMaxWidth = 400;

export interface WrapperProps {
  maxWidth?: number;
  minWidth?: number;
}

export const Border = styled.a`
  display: block;
  width: 100%;
  min-width: ${({minWidth}: WrapperProps) => `${minWidth || defaultMinWidth}px`};
  max-width: ${({maxWidth}: WrapperProps) => `${maxWidth || defaultMaxWidth}px`};
  padding: 0 8px 8px 8px;
  font-size: ${akFontSizeDefault};
  font-family: ${akFontFamily};
  border-radius: 3px;
  background-color: #F4F5F7;
  transition: background .3s;

  &:hover {
    text-decoration: none;
    background-color: ${akColorN30};
  }

`;

export const Header = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: #5E6C84;
  font-size: 12px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  margin-right: 4px;
`;

export const Content = styled.div`
  border-radius: 3px;
  background-color: ${akColorN0};
  box-shadow: 0 0 1px 0 rgba(23, 43, 77, 0.24);

  .media-card:hover & {
    box-shadow: 0 4px 8px -2px rgba(23,43,77,0.32), 0 0 1px rgba(23,43,77,0.25);
  }

`;
