import * as React from 'react';
import {Component} from 'react';
import {FileItem, FileDetails} from '@atlaskit/media-core';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ShareIcon from '@atlaskit/icon/glyph/share';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import {ItemInfoWrapper, RightIcons, LeftInfo, DetailsWrapper} from './styled';

export interface ItemInfoProps {
  metadata?: FileItem;
}

export interface ItemInfoState {
  
}

export class ItemInfo extends Component<ItemInfoProps, ItemInfoState> {
  render() {
    const {metadata} = this.props;

    return (
      <ItemInfoWrapper>
        {metadata ? this.renderDetails(metadata.details) : undefined}
      </ItemInfoWrapper>
    );
  }

  renderDetails(details: FileDetails) {
    return (
      <DetailsWrapper>
        <LeftInfo>
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
}