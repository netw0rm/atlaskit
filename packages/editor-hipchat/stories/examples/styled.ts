import styled from 'styled-components';

// tslint:disable:variable-name

export const Conversation = styled.div`
  width: 704px;
  display: flex;
  flex-direction: row;
  padding: 0 0 8px 32px;
  box-sizing: border-box;
  margin-bottom: 8px;
  margin-top: 40px;
`;

export const MessageSender = styled.div`
  flex: 0 0 32px;
  max-width: 32px;
  padding-top: 5px;
`;

export const MessageContent = styled.div`
  padding-left: 16px;
  padding-right: 80px;
  box-sizing: border-box;
  vertical-align: 'top';
  minWidth: 0;

  p {
    line-height: 20px;
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  font-size: 12px;
  min-height: 20;
  line-height: 20px;
  color: #6C798F;
  font-weight: 500;
`;

export const EditorWrapper = styled.div`
  borderRadius: 3px;
  border: 1px solid #C1C7D0;
  max-height: 305px;
  min-height: 30px;
  wordWrap: break-word;

  > div {
    padding: 4px 60px 4px 8px
  }

  p {
    line-height: 20px;
  }
`;

export const ChatInput = styled.div`
  padding: 8px 0 8px 71px;
  max-width: 704px;
  margin-right: auto;
  box-sizing: border-box;
  position: relative;
`;

export const InsertMenu = styled.div`
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
`;


export const JsonOutput = styled.pre`
  padding: 0 0 8px 71px;
  margin-top: 20px;
  white-space: pre-wrap;
  word-break: break-all;
`;
