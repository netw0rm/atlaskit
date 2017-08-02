import * as React from 'react';
import { Component } from 'react';
import { UrlPreview, ImageResizeMode } from '@atlaskit/media-core';

import { SharedCardProps, CardStatus } from '../..';
import { AppCardView } from '../../app';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardViewSmall } from '../cardViewSmall';
import { LinkCardImageView } from '../cardImageView';
import { EmbedCard } from '../embedCard';
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
        return this.renderSmallLink();

      case 'image':
        return this.renderLinkCardImage();

      case 'horizontal':
        if (smartCard) {
          return this.renderSmartCard();
        } else {
          return this.renderGenericLink();
        }

      case 'square':
        return this.renderGenericLink();

      default:
        if (smartCard) {
          return this.renderSmartCard();
        } else if (app && app.type === 'text/html') {
          return this.renderEmbedCard(app);
        } else if (player && player.type === 'text/html') {
          return this.renderEmbedCard(player);
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

  private renderEmbedCard(embed: {url?: string, html?: string, aspect_ratio?: number}) {
    return (
      <EmbedCard url={embed.url} html={embed.html} aspectRatio={embed.aspect_ratio}/>
    );
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

  private renderSmallLink(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions } = this.props;
    const { errorMessage } = this;

    return this.renderInLink(
      url,
      <LinkCardViewSmall
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        thumbnailUrl={this.iconUrl || this.thumbnailUrl}
        dimensions={dimensions}
        loading={this.isLoading}
        actions={actions}
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
