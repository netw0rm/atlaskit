import * as React from 'react';
import { Component } from 'react';
import { SharedCardProps, CardStatus } from '../..';
import { TrelloBoardLinkApp, UrlPreview, Resource } from '@atlaskit/media-core';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';
import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardViewSmall } from '../cardViewSmall';
import { LinkCardImageView } from '../cardImageView';
import { CardVideoView, CardAudioView } from '../../utils';

export interface LinkCardProps extends SharedCardProps {
  status: CardStatus;
  details?: UrlPreview;
}

export class LinkCard extends Component<LinkCardProps, {}> {
  render(): JSX.Element | null {
    const {appearance} = this.props;
    const {resources} = this;

    // If appearance is passed we prioritize that instead of the better looking one
    if (appearance === 'small') {
      return this.renderSmallLink();
    }

    if (appearance === 'image') {
      return this.renderLinkCardImage();
    }

    if (appearance === 'horizontal' || appearance === 'square') {
      return this.renderGenericLink();
    }

    if (resources) {
      if (resources.app) { return this.renderApplicationLink(); }
      if (resources.file) { return this.renderFileLink(resources.file); }
      if (resources.player) { return this.renderPlayerLink(); }
      if (resources.image) { return this.renderLinkCardImage(); }
    }

    return this.renderGenericLink();
  }

  private renderApplicationLink(): JSX.Element {
    const {app, icon} = this.resources;

    switch (app && app.type) {
      case 'trello_board':
        return this.renderTrelloBoard(app as TrelloBoardLinkApp, icon && icon.url);
      default:
        return this.renderGenericLink();
    }
  }

  private renderTrelloBoard(app: TrelloBoardLinkApp, iconUrl?: string): JSX.Element {
    return <LinkCardTrelloBoardView
      linkUrl={app.url}
      title={app.name}
      thumbnailUrl={app.background}
      iconUrl={iconUrl}
      lists={app.lists}
      members={app.member}
    />;
  }

  private renderFileLink(file: Resource): JSX.Element {
    const { title } = this.urlPreview;
    const { type } = file;

    if (type) {
      if (type.indexOf('video') === 0) {
        return (
          <CardVideoView
            videoUrl={Promise.resolve(file.url)}
            title={title}
            subtitle={this.hostName}
          />
        );
      } else if (type.indexOf('audio') === 0) {
        return (
          <CardAudioView
            audioUrl={Promise.resolve(file.url)}
            title={title}
            subtitle={this.hostName}
          />
        );
      }
    }

    return this.renderGenericLink();
  }

  private renderPlayerLink(): JSX.Element {
    const { title, site, description } = this.urlPreview;
    const { player } = this.resources;

    const playerUrl = player && player.url ? player.url : '';

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={this.thumbnailUrl}
      iconUrl={this.iconUrl}
      playerUrl={playerUrl}
    />;
  }

  private renderGenericLink(): JSX.Element {
    const { url, title, site, description } = this.urlPreview;
    const { dimensions, actions, appearance } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return <LinkCardGenericView
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
    />;
  }

  private renderSmallLink(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return (
      <LinkCardViewSmall
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        thumbnailUrl={this.iconUrl || this.thumbnailUrl}
        width={dimensions && dimensions.width}
        loading={this.isLoading}
        actions={actions}
      />
    );
  }

  private renderLinkCardImage(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { status, dimensions, actions, appearance } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return (
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
      />
    );
  }

  private get hostName(): string {
    const { site, url } = this.urlPreview;
    if (site) { return site; }
    if (window.URL) { return new URL(url).host; }

    return url;
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
}

export default LinkCard;
