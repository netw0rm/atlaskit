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
  downloadUrl?: string;
}

export interface ItemInfoState {

}

export class ItemInfo extends Component<ItemInfoProps, ItemInfoState> {

  private downloadIframe: any; // TODO: type

  render() {
    const {metadata} = this.props;

    return (
      <ItemInfoWrapper className="visible-on-hover">
        {metadata ? this.renderDetails(metadata.details) : undefined}
      </ItemInfoWrapper>
    );
  }

  download = () => {
    const {downloadUrl} = this.props;
    setTimeout(() => {
      // TODO: we need to refresh the token and then trigger the download
      // this proves that can be happen asynchronously.
      this.downloadIframe.src = downloadUrl;
    }, 1);
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
          <iframe height="0" width="0" ref={(iframe) => {this.downloadIframe = iframe}} />
          <DownloadIcon onClick={this.download} label="download" />
          <CrossIcon label="close" />
        </RightIcons>
      </DetailsWrapper>
    );
  }
}