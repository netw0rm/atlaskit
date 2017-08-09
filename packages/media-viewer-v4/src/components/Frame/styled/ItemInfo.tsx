/* tslint:disable:variable-name */
import styled from 'styled-components';
import * as style from '@atlaskit/util-shared-styles';

const iconBaseStyle = `
  margin: 0 10px;
  border-radius: 5px;
  padding: 1px 3px;
  cursor: pointer;
  transition: background-color .3s;

  &:hover {
    background-color: #2B3955;
  }
`;

export const ItemInfoWrapper = styled.div`
  padding: 10px;
  min-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, ${style.akColorN900}, rgba(14, 22, 36, 0.0));
`;

export const DetailsWrapper = styled.div`
  display: flex;
`;

export const LeftInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  > span {
    margin-left: 10px;
  }
`;

export const RightIcons = styled.div`
  > span {
    ${iconBaseStyle}
    margin: 10px;
  }
`;

export interface MiniModeIconWrapper {
  isMiniModeActive?: boolean;
}

export const MiniModeIconWrapper = styled.div`
  margin-right: 10px;
  ${iconBaseStyle}
  ${({isMiniModeActive}: MiniModeIconWrapper) => isMiniModeActive && `
    background: #2B3955;
  ` || ''}
`;
