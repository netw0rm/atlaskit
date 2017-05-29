import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import {
  akBorderRadius,
  akColorN40,
  akColorN300,
} from 'akutil-shared-styles';

import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  /* Place the editor content beneath the toolbar. */
  position: relative;
  z-index: 1;
  padding: 20px;

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
  }
`;
