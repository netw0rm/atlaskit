import {
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

  & .CodeMirror {
    height: auto;
    border: 1px solid #eee;

    & .CodeMirror-dialog {
      marginLeft: 40px;
    }
  }

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
  }
`;
