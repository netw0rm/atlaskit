/* tslint:disable: variable-name */
import styled from 'styled-components';

export interface WrapperProps {
  valign?: 'top' | 'bottom';
}

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 16px; /* TODO: this needs to be "responsive" */
  justify-content: ${({valign}: WrapperProps) => {
    switch (valign) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      default:
        return 'space-between';
    }
  }};
`;

export const TitleWrapper = styled.div`
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > div + div {
    margin-left: 4px;
  }

`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubtitleWrapper = styled.div`
  flex-grow: 1;
`;

export const ActionsWrapper = styled.div`
`;
