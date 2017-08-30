import styled from 'styled-components';

const NoteText = styled.textarea`
  height: 100px;
  width: 100%;
  border-radius: 3px;
  background-color: rgba(9, 30, 66, 0.02);
  border: solid 1px #ebedf0;
`;

NoteText.displayName = 'NoteText';
export default NoteText;
