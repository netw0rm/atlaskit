import * as React from 'react';
import {MediaItemType, MediaItemDetails, LinkDetails, UrlPreview} from '@atlaskit/media-core';

import {SharedCardProps, CardProcessingStatus} from '.';
import {LinkCard} from './links';
import {FileCard} from './files';
import {isLinkDetails} from './utils/isLinkDetails';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardProcessingStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: MediaItemDetails;

  // allow extra props to be passed down to lower views e.g. dataURI to FileCard
  [propName: string]: any;
}

export class CardView extends React.Component<CardViewProps, {}> {  // tslint:disable-line:variable-name
  render() {
    const {mediaItemType} = this.props;

    if (mediaItemType === 'link') {
      return this.renderLink();
    } else if (mediaItemType === 'file') {
      return this.renderFile();
    }

    return this.renderCardFromDetails();
  }

  private renderCardFromDetails = () => {
    const {metadata} = this.props;

    if (isLinkDetails(metadata)) {
      return this.renderLink();
    }

    return this.renderFile();
  }

  renderLink = () => {
    const {mediaItemType, status, metadata, ...otherProps} = this.props;

    return (
      <LinkCard
        {...otherProps}
        status={status}
        details={metadata as LinkDetails | UrlPreview}
      />
    );
  }

  renderFile = () => {
    const {mediaItemType, status, metadata, ...otherProps} = this.props;

    return (
      <FileCard
        {...otherProps}
        status={status}
        details={metadata}
      />
    );
  }
}
