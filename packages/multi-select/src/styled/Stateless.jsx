import styled, { css } from 'styled-components';
import { akFontSizeDefault, akGridSizeUnitless, akColorN200 } from '@atlaskit/util-shared-styles';

const fontSizeDefault = parseInt(akFontSizeDefault, 10);
const lineHeightDefault = (akGridSizeUnitless * 2) / fontSizeDefault;

const Input = styled.input`
  display: inline-block;
  flex: 1 0 10px;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  background: none;
  align-self: center;
  font-size: ${akFontSizeDefault};
  line-height: ${lineHeightDefault};

  &::placeholder {
    font-size: 14px;
    color: ${akColorN200};
  }
`;

const SelectWrapper = styled.div`
  display: inline-block;

  ${({ shouldFitContainer }) => (shouldFitContainer ? css`display: block;` : css`display: inline-block;`)}
`;

export { Input, SelectWrapper };
