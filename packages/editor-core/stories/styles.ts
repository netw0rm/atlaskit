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

import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { border-right: 2px solid #0066FF; }
  50% { border-right: 1px solid transparent; }
  100% { border-right: 2px solid #0066FF; }
`;

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  & .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 12px 20px;
    position: relative;
    caret-color: blue;

    & blockquote {
      border-left: 4px solid ${akColorN40};
      color: ${akColorN300};
      position: relative;

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
      position: relative;
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

  // ******** FAKE CURSOR RELATED STYLES ********

  & .ProseMirror table {
    position: relative;
  }

  & .ProseMirror-fakecursor {
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    caret-color: transparent;
  }

  & .ProseMirror-fakecursor:after {
    content: "";
    display: inline;
    position: absolute;
    top: 0px;
    height: 100%;
    border-right: 2px solid #0066FF;
    animation: 1s ${blink} step-end infinite;
  }

  & .ProseMirror-fakecursor-left:after {
    left: 0px;
  }

  & .ProseMirror-fakecursor-right:after {
    right: 0px;
  }

  & pre .ProseMirror-fakecursor-left:before {
    content: "";
    margin-left: 12px;
    background: ${akEditorCodeBackground};
    width: 1px;
    height: 100%;
    display: inline-block;
  }

  & .Fakecursor-caret-cover {
    pointer-events: none;
    position: absolute;
    height: 100%;
    top: 0;
    width: 1px;
    display: inline-block;
    background: white;
  }

  & pre .Fakecursor-caret-cover {
    background: ${akEditorCodeBackground};
  }

  & blockquote .ProseMirror-fakecursor-left {
    left: -5px;
  }

  & blockquote .ProseMirror-fakecursor-left:before {
    content: "";
    margin-left: 21px;
    background: white;
    width: 1px;
    height: 100%;
    display: inline-block;
  }

  & table .ProseMirror-fakecursor-left:after {
    left: -12px;
  }

  & table .ProseMirror-fakecursor-left:before {
    content: "";
    margin-left: 11px;
    margin-top: 2px;
    background: #F4F5F7;
    width: 1px;
    height: 30px;
    display: inline-block;
  }

  & table .Fakecursor-caret-cover {
    background: transparent;
  }

  & .ProseMirror-fakecursor-right:after {
    right: -2px;
  }

  & div[data-panel-type="info"] .ProseMirror-fakecursor-left:before {
    content: "";
    margin-left: 24px;
    // todo: replace with actual panel color
    background: white;
    width: 1px;
    height: 100%;
    display: inline-block;
  }

  & div[data-panel-type="info"] .Fakecursor-caret-cover {
    pointer-events: none;
    position: absolute;
    height: 100%;
    top: 0;
    width: 1px;
    margin-left: -1px;
    display: inline-block;
    background: white;
  }
`;

// tslint:disable-next-line:variable-name
export const ButtonGroup = styled.span`
  display: flex;

  & > button {
    margin-left: ${akGridSizeUnitless/2}px;
  }
`;
