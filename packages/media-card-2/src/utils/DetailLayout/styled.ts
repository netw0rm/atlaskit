/* tslint:disable: variable-name */
import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 16px; /* TODO: this needs to be "responsive" */
`;

export const TitleWrapper = styled.div`
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > div + div {
    margin-left: 4px;
  }

`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubtitleWrapper = styled.div`
  flex-grow: 1;
  background-color: lightgreen;
`;

export const ActionsWrapper = styled.div`
  background-color: lightblue;
`;
