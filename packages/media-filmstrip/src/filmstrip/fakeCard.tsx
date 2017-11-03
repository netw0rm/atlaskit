import * as React from 'react';
import styled from 'styled-components';
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';

const MEDIA_HEIGHT = 125;
const FILE_WIDTH = 156;

const IconWrapper = styled.div`
  color: rgba(0, 82, 204, 0.4);
  background: rgba(0, 101, 255, 0.8);
  border-radius: ${akBorderRadius};
  margin: 0;
  width: ${FILE_WIDTH}px;
  min-height: ${MEDIA_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: -webkit-grab;
`;
const DraggedFilesWrapper = styled.div`
  position: absolute;
  margin-top: 6px;
  font-size: 18px;
  color: rgba(255,255,255,0.8);
`;

export default ({draggedFiles}) => {
  const draggedFilesLength = draggedFiles > 1 ? <DraggedFilesWrapper>{draggedFiles}</DraggedFilesWrapper> : null;

  return (
    <IconWrapper>
      {draggedFilesLength}
      <DocumentFilledIcon label="Document" size="xlarge" />
    </IconWrapper>
  )
};
