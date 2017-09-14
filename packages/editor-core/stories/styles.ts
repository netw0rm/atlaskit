import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import {
  akBorderRadius,
  akColorN40,
  akColorN300,
  akColorN800,
  akGridSizeUnitless,
} from 'akutil-shared-styles';

import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  & .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 12px 20px;

    & blockquote {
      border-left: 4px solid ${akColorN40};
      color: ${akColorN300};

      &::before, &::after {
        content: none;
      }
      & > *:last-child {
        display: block;
      }
    }
    & pre {
      font-family: ${akEditorCodeFontFamily};
      background: ${akEditorCodeBackground};
      padding: ${akEditorCodeBlockPadding};
      border-radius: ${akBorderRadius};
    }
    & .code, & code {
      padding: 1px 3px;
      border: 1px solid #ccc;
      border-radius: 3px;
      background: ${akEditorCodeBackground};
      font-size: 12px;
      line-height: 1.4;

      &:before, &:after {
        vertical-align: text-top;
        display: inline-block;
        width: 3px;
        content: '';
      }
    }
  }

  //=============== LINK FAKE CURSOR STYLES=========
  & .ProseMirror-link-fakecursor {
    display: none;
    pointer-events: none;
    position: relative;
    height: 15px;
  }

  & .ProseMirror-link-fakecursor:after {
    content: "";
    display: inline;
    top: 0;
    position: absolute;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
  }

  & .ProseMirror-link-fakecursor {
    display: inline;
  }
  //=============== LINK FAKE CURSOR STYLES================

  & div.toolsDrawer {
    padding: 8px 16px;
    background: ${akColorN800};

    & label {
      display: flex;
      color: white;
      align-self: center;
      padding-right: 8px;
    }

    & > div {
      // padding: 4px 0;
    }

    & button {
      margin: 4px 0;
    }
  }

  & legend {
    margin: 8px 0;
  }

  & input {
    font-size: 13px;
  }
`;

// tslint:disable-next-line:variable-name
export const ButtonGroup = styled.span`
  display: flex;

  & > button {
    margin-left: ${akGridSizeUnitless/2}px;
  }
`;
