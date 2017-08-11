import * as React from 'react';
import {Component} from 'react';
import {FileItem, FileDetails} from '@atlaskit/media-core';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ShareIcon from '@atlaskit/icon/glyph/share';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import {ItemInfoWrapper, RightIcons, LeftInfo, DetailsWrapper, MiniModeIconWrapper} from '../styled/ItemInfo';

// function renderMiniModeIcon(props) {
//   const {canUseMiniMode, isMiniModeActive, onMiniModeChange} = props;
//   if (!canUseMiniMode) {
//     return null;
//   }
//   const onMiniModeChangeCallback = () => onMiniModeChange(!this.props.isMiniModeActive);
//   return (
//     <MiniModeIconWrapper isMiniModeActive={isMiniModeActive} onClick={onMiniModeChangeCallback}>
//       <DocumentsIcon label="mini mode" />
//     </MiniModeIconWrapper>
//   );
// }

export interface ItemInfoProps {
  canUseMiniMode?: boolean;
  isMiniModeActive?: boolean;
  onMiniModeChange?: any;
  name?: string;
  onClose?: () => void;
}

export default function ItemInfo(props: ItemInfoProps) {
  const {name, onClose} = this.props;
  return (
    <ItemInfoWrapper className="visible-on-hover">
      <DetailsWrapper>
        <LeftInfo>
          {/* {renderMiniModeIcon()} */}
          {name}
            <ChevronDownIcon label="down"/>
        </LeftInfo>
        <RightIcons>
          <ShareIcon label="share" />
          <DownloadIcon label="download" />
          <CrossIcon label="close" onClick={onClose} />
        </RightIcons>
      </DetailsWrapper>
    </ItemInfoWrapper>
  );
}
