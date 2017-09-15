import * as React from 'react';
import { Component } from 'react';
import { UrlPreview, ImageResizeMode, Resource } from '@atlaskit/media-core';

import { SharedCardProps, CardStatus } from '../..';
import { AppCardView } from '../../app';
import { LinkCardGenericView } from '../cardGenericView';
import { CardGenericViewSmall } from '../../utils/cardGenericViewSmall';
import { LinkCardImageView } from '../cardImageView';
import { URLEmbedCard } from '../embed/urlEmbedCard';
import { HTMLEmbedCard } from '../embed/htmlEmbedCard';
import { A } from './styled';

export interface LinkCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: UrlPreview;
  readonly resizeMode?: ImageResizeMode;
}

export class LinkCard extends Component<LinkCardProps, {}> {

  render(): JSX.Element | null {
    const {resources: {smartCard, app, player, image}} = this;
    const {appearance} = this.props;

    switch (appearance) {

      case 'small':
        return this.renderSmallCard();

      case 'image':
        return this.renderLinkCardImage();

      case 'horizontal':
        // https://product-fabric.atlassian.net/browse/MSW-155
        return this.renderGenericLink();

      case 'square':
        return this.renderGenericLink();

      default:
        if (smartCard) {
          return this.renderSmartCard();
        } else if (app && this.isEmbed(app)) {
          return this.renderEmbed(app);
        } else if (player && this.isEmbed(player)) {
          return this.renderEmbed(player);
        } else if (image) {
          return this.renderLinkCardImage();
        } else {
          return this.renderGenericLink();
        }

    }

  }

  private renderInLink(link, child): JSX.Element  {
    const {isLoading, isError} = this;
    if (link && !isLoading && !isError) {
      return (
        <A linkUrl={link}>
          {child}
        </A>
      );
    } else {
      return child;
    }
  }

  private isURLEmbed(embed: Resource): boolean {
    const {type, url, height, aspect_ratio} = embed;

    // we can only embed HTML pages in an iframe
    if (type !== 'text/html') {
      return false;
    }

    // we need a height to know how big to show the iframe, otherwise, for some embeds,
    // we will be cutting off the content, or showing too much whitespace around the content.
    // we don't care as much about the width - most will stretch content to the width, or center content
    return Boolean(url && (height || aspect_ratio));

  }

  private isHTMLEmbed(embed: Resource): boolean {
    const {type, html} = embed;

    // we can only embed HTML pages in an iframe
    if (type !== 'text/html') {
      return false;
    }

    return Boolean(html);
  }

  private isEmbed(embed: Resource): boolean {
    return this.isURLEmbed(embed) || this.isHTMLEmbed(embed);
  }

  private renderURLEmbed(embed: Resource): JSX.Element {
    const {url, width, height, aspect_ratio} = embed;
    return (
      <URLEmbedCard url={url || ''} width={width} height={height} aspectRatio={aspect_ratio}/>
    );
  }

  private renderHTMLEmbed(embed: Resource): JSX.Element {
    const {html} = embed;
    return (
      <HTMLEmbedCard html={html || ''}/>
    );
  }

  private renderEmbed(embed: Resource) {

    if (this.isURLEmbed(embed)) {
      return this.renderURLEmbed(embed);
    }

    if (this.isHTMLEmbed(embed)) {
      return this.renderHTMLEmbed(embed);
    }

    // this case should never occur provided we've called `isEmbed(embed)` before calling this method
    return null;
  }

  private renderSmartCard(): JSX.Element {
    const {resources: {smartCard}} = this;

    // this check is just to silence TS - this method should never be called if we don't have
    // data for a smart-card
    if (!smartCard) {
      throw new Error('Must have smartCard data to render a smart card');
    }

    return this.renderInLink(
      smartCard.link ? smartCard.link.url : '',
      <AppCardView model={smartCard}/>
    );
  }

  private renderGenericLink(): JSX.Element | null {
    const { url, title, site, description } = this.urlPreview;
    const { dimensions, actions, appearance } = this.props;
    const { errorMessage } = this;

    return this.renderInLink(
      url,
      <LinkCardGenericView
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        description={description}
        thumbnailUrl={this.thumbnailUrl}
        iconUrl={this.iconUrl}
        dimensions={dimensions}
        appearance={appearance}
        loading={this.isLoading}
        actions={actions}
      />
    );
  }

  private renderSmallCard(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions } = this.props;
    const { iconUrl, thumbnailUrl, isLoading, errorMessage } = this;
    return this.renderInLink(
      url,
      <CardGenericViewSmall
        title={title}
        subtitle={site || url}
        iconUrl={iconUrl}
        thumbnailUrl={thumbnailUrl}
        dimensions={dimensions}
        loading={isLoading}
        actions={actions}
        error={errorMessage}
        type="link"
        mediaType="image"
      />
    );
  }

  private renderLinkCardImage(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { status, dimensions, actions, appearance, resizeMode } = this.props;
    const { errorMessage } = this;

    return this.renderInLink(
      url,
      <LinkCardImageView
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        thumbnailUrl={this.thumbnailUrl}
        appearance={appearance}
        dimensions={dimensions}
        status={status}
        actions={actions}
        iconUrl={this.iconUrl}
        resizeMode={resizeMode}
      />
    );
  }

  private get resources() {
    const { resources } = this.urlPreview;
    return resources || {};
  }

  private get urlPreview() {
    const defaultUrlPreview: UrlPreview = {type: '', url: '', title: ''};
    const urlPreview = this.props.details;

    // We provide a defaultUrlPreview in order to conform what the card is expecting and show the right loading status
    return urlPreview || defaultUrlPreview;
  }

  private get thumbnailUrl() {
    const { thumbnail, image } = this.resources;
    const imageUrl = image ? image.url : undefined;
    const thumbnailUrl = thumbnail ? thumbnail.url : undefined;

    // TODO: Should we default here to 'this.iconUrl'?
    return imageUrl || thumbnailUrl;
  }

  private get iconUrl() {
    const { icon } = this.resources;

    return icon ? icon.url : undefined;
  }

  private get isLoading(): boolean {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get isError(): boolean {
    const {status} = this.props;
    return status === 'error';
  }

  private get errorMessage(): string | undefined {
    return this.isError ? 'Loading failed' : undefined;
  }
}

export default LinkCard;
