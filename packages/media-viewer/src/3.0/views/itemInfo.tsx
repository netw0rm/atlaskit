import * as React from 'react';
import {Component} from 'react';
import {FileItem, FileDetails} from '@atlaskit/media-core';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ShareIcon from '@atlaskit/icon/glyph/share';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import {ItemInfoWrapper, RightIcons, LeftInfo, DetailsWrapper, MiniModeIconWrapper} from './styled';

export interface ItemInfoProps {
  metadata?: FileItem;
  canUseMiniMode?: boolean;
  isMiniModeActive?: boolean;
  onMiniModeChange?: any;
}

export interface ItemInfoState {
  
}

export class ItemInfo extends Component<ItemInfoProps, ItemInfoState> {
  render() {
    const {metadata} = this.props;

    return (
      <ItemInfoWrapper className="visible-on-hover">
        {metadata ? this.renderDetails(metadata.details) : undefined}
      </ItemInfoWrapper>
    );
  }

  renderDetails(details: FileDetails) {
    return (
      <DetailsWrapper>
        <LeftInfo>
          {this.renderMiniModeIcon()}
          {details.name}
          <ChevronDownIcon label="down"/>
        </LeftInfo>
        <RightIcons>
          <ShareIcon label="share" />
          <DownloadIcon label="download" />
          <CrossIcon label="close" />
        </RightIcons>
      </DetailsWrapper>
    );
  }

  renderMiniModeIcon() {
    const {canUseMiniMode, isMiniModeActive, onMiniModeChange} = this.props;

    if (!canUseMiniMode) {
      return;
    }

    return (
      <MiniModeIconWrapper isMiniModeActive={isMiniModeActive} onClick={() => onMiniModeChange(!this.props.isMiniModeActive)}>
        <DocumentsIcon label="mini mode" />
      </MiniModeIconWrapper>
    );
  }
}