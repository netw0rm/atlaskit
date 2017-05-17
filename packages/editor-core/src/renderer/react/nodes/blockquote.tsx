import {
  akColorN800,
  akFontSizeDefault,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.blockquote`
  margin: ${akGridSizeUnitless * 1.5}px 0 0 0;
  color: ${akColorN800};
  border: none;
  padding-left: ${akGridSizeUnitless * 5}px;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: ${akGridSizeUnitless * 5}px;
  }

  &:first-child {
    margin-top: 0;
  }

  &::before {
    content: "\\201C";
    float: left;
    margin-left: -${akFontSizeDefault};
    text-align: right;
    width: ${akFontSizeDefault};
    [dir="rtl"] & {
      float: right;
      margin-right: -${akFontSizeDefault};
      text-align: left;
    }
  }

  &::after {
    content: "\\201D";
  }

  & > :last-child {
    display: inline-block;
  }
`;
