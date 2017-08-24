import styled, { css } from 'styled-components';
import { colors, gridSize, fontSize } from '@atlaskit/theme';

const lineHeightDefault = (gridSize() * 2) / fontSize();

const Input = styled.input`
  display: inline-block;
  flex: 1 0 10px;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  background: none;
  align-self: center;
  font-size: ${fontSize()}px;
  line-height: ${lineHeightDefault};

  &::placeholder {
    font-size: 14px;
    color: ${colors.N200};
  }
`;

const SelectWrapper = styled.div`
  display: inline-block;

  ${({ shouldFitContainer }) => (shouldFitContainer ? css`display: block;` : css`display: inline-block;`)}
`;

export { Input, SelectWrapper };
