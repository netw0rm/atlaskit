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

export const ItemPreviewWrapper = styled.div`
  flex: 1;
  padding: 10px;
  overflow: hidden;
`;

export const ArrowLeftWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 33%;

  > span {
    transition: background .3s;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    color: #576074;
    border-radius: 100%;
    margin-left: 10px;

    &:hover {
      background: white;
    }
  }
`;

export const ArrowRightWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 33%;
  justify-content: flex-end;

  > span {
    transition: background .3s;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    color: #576074;
    border-radius: 100%;
    margin-right: 10px;

    &:hover {
      background: white;
    }
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
