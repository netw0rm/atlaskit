import * as React from 'react';
import {Component} from 'react';
import {FileItem, FileDetails} from '@atlaskit/media-core';
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
  onClose?: any;
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
    const {onClose} = this.props;

    return (
      <DetailsWrapper>
        <LeftInfo>
          {this.renderMiniModeIcon()}
          <span>
            {details.name}
          </span>
        </LeftInfo>
        <RightIcons>
          <ShareIcon label="share" />
          <DownloadIcon label="download" />
          <CrossIcon label="close" onClick={onClose} />
        </RightIcons>
      </DetailsWrapper>
    );
  }

  renderMiniModeIcon() {
    const {canUseMiniMode, isMiniModeActive, onMiniModeChange} = this.props;

    if (!canUseMiniMode) {
      return;
    }
    const onMiniModeChangeCallback = () => onMiniModeChange(!this.props.isMiniModeActive);
    return (
      <MiniModeIconWrapper isMiniModeActive={isMiniModeActive} onClick={onMiniModeChangeCallback}>
        <DocumentsIcon label="mini mode" />
      </MiniModeIconWrapper>
    );
  }
}
