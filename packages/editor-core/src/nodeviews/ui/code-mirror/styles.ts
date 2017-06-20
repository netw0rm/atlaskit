import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const CodeMirrorTextArea = styled.textarea`
  & .CodeMirror {
    height: auto;
    border: 1px solid #eee;

    & .CodeMirror-dialog {
      marginLeft: 40px;
    }
  }
`;
