/* tslint:disable:variable-name */
import styled from 'styled-components';

export const ItemInfoWrapper = styled.div`
  padding: 10px;
  min-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, #0e1624, rgba(14, 22, 36, 0.0));
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
`;

export const ItemToolsWrapper = styled.div`
  display: flex;
  padding: 10px;
  min-height: 50px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0.0));
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
    margin: 0 10px;
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
    margin: 0 10px;
    border-radius: 5px;
    padding: 1px 3px;
    cursor: pointer;
    transition: background-color .3s;

    &:hover {
      background-color: #2B3955;
    }
  }
`;

export const ZoomWrapper = styled.div`
  flex: 1;
  text-align: right;
  user-select: none;
`;

export const EditorIconWrapper = styled.div`
  border-radius: 5px;
  ${({isEditing}: any) => isEditing && `
    background: #2B3955;
  ` || ''}
`;
