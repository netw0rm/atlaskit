import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import {
  akBorderRadius,
  akColorN40,
  akColorN300,
  akColorR400,
  akColorY400,
  akColorG400,
  akColorT400,
  akColorB400,
  akColorP400,
  akColorN800,
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

    & .telepointer {
      position: relative;

      &.telepointer-pointer {
        background-color: rgba(0, 0, 0, 0) !important;
        &::after {
          position: absolute;
          content: ' ';
          border-right: 2px solid #ff0000;
        }
      }

      &.telepointer-selection {
      }

      &.color-R400 {
        background-color: rgba(222, 53, 11, .5);
        &::after {
          border-color: ${akColorR400};
        }
      }

      &.color-Y400 {
        background-color: rgba(255, 153, 31, .5);
        &::after {
          border-color: ${akColorY400};
        }
      }

      &.color-G400 {
        background-color: rgba(0, 135, 90, .5);
        &::after {
          border-color: ${akColorG400};
        }
      }

      &.color-T400 {
        background-color: rgba(0, 163, 191, .5);
        &::after {
          border-color: ${akColorT400};
        }
      }

      &.color-B400 {
        background-color: rgba(0, 82, 204, .5);
        &::after {
          border-color: ${akColorB400};
        }
      }

      &.color-P400 {
        background-color: rgba(82, 67, 170, .5);
        &::after {
          border-color: ${akColorP400};
        }
      }

      &.color-N800 {
        background-color: rgba(23, 43, 7, .5);
        &::after {
          border-color: ${akColorN800};
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
`;
