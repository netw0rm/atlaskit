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

export const ItemToolsWrapper = styled.div`
  display: flex;
  padding: 10px;
  min-height: 50px;
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  background: linear-gradient(to top, ${style.akColorN900}, rgba(14, 22, 36, 0.0));
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

export const UploaderDetailsWrapper = styled.div`
  flex: 1;
`;

export const ToolsContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    ${iconBaseStyle}
  }
`;

export const ZoomWrapper = styled.div`
  flex: 1;
  text-align: right;
  user-select: none;
  margin-right: 15px;
`;

export interface EditorIconWrapperProps {
  isEditing?: boolean;
}

export const EditorIconWrapper = styled.div`
  border-radius: 5px;
  ${({isEditing}: EditorIconWrapperProps) => isEditing && `
    background: #2B3955;
  ` || ''}
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
